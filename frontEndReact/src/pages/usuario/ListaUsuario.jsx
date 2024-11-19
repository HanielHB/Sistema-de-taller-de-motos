import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaUsuario = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaUsuarios();
        document.title = "Lista de Usuarios";
    }, []);

    const getListaUsuarios = () => {
        axios.get('http://127.0.0.1:8000/api/usuarios')
            .then(res => {
                setListaUsuarios(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de usuarios:", error);
                setError("Error al obtener la lista de usuarios. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este usuario?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}`)
            .then(res => {
                console.log(res.data);
                getListaUsuarios(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el usuario:", error);
                setError("Error al eliminar el usuario. Inténtelo más tarde.");
            });
    };

    const editarUsuario = (id) => {
        navigate(`/usuarios/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Usuarios</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Correo</th>
                                            <th>Persona Asociada</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaUsuarios.map(usuario => (
                                            <tr key={usuario.id}>
                                                <td>{usuario.id}</td>
                                                <td>{usuario.email}</td>
                                                <td>
                                                    {usuario.persona_id ? `Persona ID: ${usuario.persona_id}` : "N/A"}
                                                </td>
                                                <td>{usuario.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarUsuario(usuario.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(usuario.id)}
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

export default ListaUsuario;
