import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaCliente = () => {
    const [listaClientes, setListaClientes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaClientes();
        document.title = "Lista de Clientes";
    }, []);

    const getListaClientes = () => {
        axios.get('http://127.0.0.1:8000/api/clientes')
            .then(res => {
                setListaClientes(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de clientes:", error);
                setError("Error al obtener la lista de clientes. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este cliente?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/clientes/${id}`)
            .then(res => {
                console.log(res.data);
                getListaClientes(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el cliente:", error);
                setError("Error al eliminar el cliente. Inténtelo más tarde.");
            });
    };

    const editarCliente = (id) => {
        navigate(`/cliente/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Clientes</h2>
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
                                        {listaClientes.map(cliente => (
                                            <tr key={cliente.id}>
                                                <td>{cliente.id}</td>
                                                <td>
                                                    {cliente.persona ? `${cliente.persona.nombre} ${cliente.persona.apellido}` : "N/A"}
                                                </td>
                                                <td>{cliente.razon_social}</td>
                                                <td>{cliente.nit}</td>
                                                <td>{cliente.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarCliente(cliente.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(cliente.id)}
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

export default ListaCliente;
