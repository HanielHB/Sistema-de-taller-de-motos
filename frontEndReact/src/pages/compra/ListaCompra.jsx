import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaCompra = () => {
    const [listaCompras, setListaCompras] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaCompras();
        document.title = "Lista de Compras";
    }, []);

    const getListaCompras = () => {
        axios.get('http://127.0.0.1:8000/api/compras')
            .then(res => {
                setListaCompras(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de compras:", error);
                setError("Error al obtener la lista de compras. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta compra?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/compras/${id}`)
            .then(res => {
                console.log(res.data);
                getListaCompras(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar la compra:", error);
                setError("Error al eliminar la compra. Inténtelo más tarde.");
            });
    };

    const editarCompra = (id) => {
        navigate(`/compra/${id}`); // Redirigir a la página de edición
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Compras</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Proveedor Asociado</th>
                                            <th>Monto Total</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaCompras.map(compra => (
                                            <tr key={compra.id}>
                                                <td>{compra.id}</td>
                                                <td>
                                                    {compra.proveedor ? compra.proveedor.razon_social : "N/A"}
                                                </td>
                                                <td>{compra.monto_total}</td>
                                                <td>{compra.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarCompra(compra.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(compra.id)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaCompra;
