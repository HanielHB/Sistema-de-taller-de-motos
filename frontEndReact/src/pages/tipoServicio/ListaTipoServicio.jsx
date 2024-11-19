import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert, Form, InputGroup } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare, BsTrash, BsSearch } from "react-icons/bs"; // Íconos

const ListaTipoServicio = () => {
    const [listaTipoServicios, setListaTipoServicios] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(""); // Para la barra de búsqueda
    const navigate = useNavigate();

    useEffect(() => {
        getListaTipoServicios();
        document.title = "Lista de Tipos de Servicios";
    }, []);

    const getListaTipoServicios = () => {
        axios.get("http://127.0.0.1:8000/api/tipo_servicios")
            .then(res => {
                setListaTipoServicios(res.data);
            })
            .catch(error => {
                console.error("Error al obtener la lista de tipos de servicios:", error);
                setError("Error al obtener la lista de tipos de servicios. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este tipo de servicio?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/tipo_servicios/${id}`)
            .then(res => {
                console.log(res.data);
                getListaTipoServicios(); // Refresca la lista después de eliminar
            })
            .catch(error => {
                console.error("Error al eliminar el tipo de servicio:", error);
                setError("Error al eliminar el tipo de servicio. Inténtelo más tarde.");
            });
    };

    const editarTipoServicio = (id) => {
        navigate(`/tipo_servicio/${id}`); // Redirigir a la página de edición
    };

    // Filtrar servicios por nombre
    const serviciosFiltrados = listaTipoServicios.filter(tipoServicio =>
        tipoServicio.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Row className="align-items-center mb-3">
                    <Col>
                        <h1 className="text-primary">Gestión de Tipos de Servicios</h1>
                        <p className="text-muted">Administra y organiza los tipos de servicios fácilmente.</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={() => navigate("/tipo_servicio")}>
                            + Nuevo Tipo de Servicio
                        </Button>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col md={4}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar por nombre..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Table hover responsive>
                            <thead className="table-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviciosFiltrados.map(tipoServicio => (
                                    <tr key={tipoServicio.id}>
                                        <td>{tipoServicio.id}</td>
                                        <td>{tipoServicio.nombre}</td>
                                        <td>
                                            <span className={`badge ${tipoServicio.estado === 1 ? "bg-success" : "bg-secondary"}`}>
                                                {tipoServicio.estado === 1 ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => editarTipoServicio(tipoServicio.id)}
                                                className="me-2"
                                                title="Editar"
                                            >
                                                <BsPencilSquare />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => eliminar(tipoServicio.id)}
                                                title="Eliminar"
                                            >
                                                <BsTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {serviciosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            No se encontraron resultados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default ListaTipoServicio;
