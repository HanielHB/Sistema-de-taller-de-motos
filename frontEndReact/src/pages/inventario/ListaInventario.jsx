import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaInventario = () => {
    const [listaInventarios, setListaInventarios] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaInventarios();
        document.title = "Lista de Inventarios";
    }, []);

    const getListaInventarios = () => {
        axios.get('http://127.0.0.1:8000/api/inventarios')
            .then(res => {
                setListaInventarios(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de inventarios:", error);
                setError("Error al obtener la lista de inventarios. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este inventario?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/inventarios/${id}`)
            .then(res => {
                console.log(res.data);
                getListaInventarios(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el inventario:", error);
                setError("Error al eliminar el inventario. Inténtelo más tarde.");
            });
    };

    const editarInventario = (id) => {
        navigate(`/inventario/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Inventarios</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Producto</th>
                                            <th>Precio Compra</th>
                                            <th>Precio Venta</th>
                                            <th>Stock</th>
                                            <th>Cantidad Compra</th>
                                            <th>Fecha Ingreso</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaInventarios.map(inventario => (
                                            <tr key={inventario.id}>
                                                <td>{inventario.id}</td>
                                                <td>{inventario.producto ? inventario.producto.nombre : "N/A"}</td>
                                                <td>{inventario.precio_compra}</td>
                                                <td>{inventario.precio_venta}</td>
                                                <td>{inventario.stock}</td>
                                                <td>{inventario.cantidad_compra}</td>
                                                <td>{inventario.fecha_ingreso}</td>
                                                <td>{inventario.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarInventario(inventario.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(inventario.id)}
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

export default ListaInventario;
