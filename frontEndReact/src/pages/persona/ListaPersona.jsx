import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaPersona = () => {
    const [listaPersonas, setListaPersonas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaPersonas();
        document.title = "Lista de Personas";
    }, []);

    const getListaPersonas = () => {
        axios.get('http://127.0.0.1:8000/api/personas')
            .then(res => {
                setListaPersonas(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de personas:", error);
                setError("Error al obtener la lista de personas. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar esta persona?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/personas/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPersonas(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar la persona:", error);
                setError("Error al eliminar la persona. Inténtelo más tarde.");
            });
    };

    const editarPersona = (id) => {
        navigate(`/personas/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Personas</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>CI</th>
                                            <th>Correo</th>
                                            <th>Celular</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPersonas.map(persona => (
                                            <tr key={persona.id}>
                                                <td>{persona.id}</td>
                                                <td>
                                                    <span  
                                                    >
                                                        {persona.nombre}
                                                    </span>
                                                </td>
                                                <td>{persona.apellido}</td>
                                                <td>{persona.ci}</td>
                                                <td>{persona.correo_personal}</td>
                                                <td>{persona.celular}</td>
                                                <td>{persona.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarPersona(persona.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(persona.id)}
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

export default ListaPersona;
