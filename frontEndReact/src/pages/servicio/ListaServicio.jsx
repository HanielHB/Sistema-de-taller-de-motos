import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert, Form, InputGroup } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";
import { BsPencilSquare, BsTrash, BsSearch } from "react-icons/bs"; // Íconos

const ListaServicio = () => {
    const [listaServicios, setListaServicios] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(""); // Para la barra de búsqueda
    const navigate = useNavigate();

    useEffect(() => {
        getListaServicios();
        document.title = "Lista de Servicios";
    }, []);

    const getListaServicios = () => {
        axios
            .get("http://127.0.0.1:8000/api/servicios")
            .then((res) => {
                setListaServicios(res.data);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de servicios:", error);
                setError("Error al obtener la lista de servicios. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este servicio?");
        if (!confirm) return;

        axios
            .delete(`http://127.0.0.1:8000/api/servicios/${id}`)
            .then((res) => {
                console.log(res.data);
                getListaServicios(); // Refresca la lista después de eliminar
            })
            .catch((error) => {
                console.error("Error al eliminar el servicio:", error);
                setError("Error al eliminar el servicio. Inténtelo más tarde.");
            });
    };

    const editarServicio = (id) => {
        navigate(`/servicio/${id}`); // Redirigir a la página de edición
    };

    // Filtrar servicios por nombre o descripción
    const serviciosFiltrados = listaServicios.filter(
        (servicio) =>
            servicio.nombre.toLowerCase().includes(search.toLowerCase()) ||
            (servicio.descripcion || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Row className="align-items-center mb-3">
                    <Col>
                        <h1 className="text-primary">Gestión de Servicios</h1>
                        <p className="text-muted">Administra y organiza los servicios fácilmente.</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="success" onClick={() => navigate("/servicio")}>
                            + Nuevo Servicio
                        </Button>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Row className="mb-3">
                            <Col md={6}>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <BsSearch />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar por nombre o descripción..."
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
                                    <th>Tipo de Servicio</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviciosFiltrados.map((servicio) => (
                                    <tr key={servicio.id}>
                                        <td>{servicio.id}</td>
                                        <td>
                                            {servicio.tipo_servicio ? (
                                                <span className="badge bg-info">{servicio.tipo_servicio.nombre}</span>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td>{servicio.nombre}</td>
                                        <td>{servicio.descripcion || "Sin descripción"}</td>
                                        <td>Bs {servicio.precio.toFixed(2)}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    servicio.estado === 1 ? "bg-success" : "bg-secondary"
                                                }`}
                                            >
                                                {servicio.estado === 1 ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => editarServicio(servicio.id)}
                                                className="me-2"
                                                title="Editar"
                                            >
                                                <BsPencilSquare />
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => eliminar(servicio.id)}
                                                title="Eliminar"
                                            >
                                                <BsTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {serviciosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">
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

export default ListaServicio;
