import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaProveedor = () => {
    const [listaProveedores, setListaProveedores] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaProveedores();
        document.title = "Lista de Proveedores";
    }, []);

    const getListaProveedores = () => {
        axios.get('http://127.0.0.1:8000/api/proveedores')
            .then(res => {
                setListaProveedores(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de proveedores:", error);
                setError("Error al obtener la lista de proveedores. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este proveedor?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/proveedores/${id}`)
            .then(res => {
                console.log(res.data);
                getListaProveedores(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el proveedor:", error);
                setError("Error al eliminar el proveedor. Inténtelo más tarde.");
            });
    };

    const editarProveedor = (id) => {
        navigate(`/proveedor/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Proveedores</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Persona Asociada</th>
                                            <th>Razón Social</th>
                                            <th>NIT</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaProveedores.map(proveedor => (
                                            <tr key={proveedor.id}>
                                                <td>{proveedor.id}</td>
                                                <td>
                                                    {proveedor.persona ? `${proveedor.persona.nombre} ${proveedor.persona.apellido}` : "N/A"}
                                                </td>
                                                <td>{proveedor.razon_social}</td>
                                                <td>{proveedor.nit}</td>
                                                <td>{proveedor.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarProveedor(proveedor.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(proveedor.id)}
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

export default ListaProveedor;
