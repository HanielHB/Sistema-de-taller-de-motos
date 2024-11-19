import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaTipoProducto = () => {
    const [listaTipoProductos, setListaTipoProductos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaTipoProductos();
        document.title = "Lista de Tipos de Productos";
    }, []);

    const getListaTipoProductos = () => {
        axios.get('http://127.0.0.1:8000/api/tipo_productos')
            .then(res => {
                setListaTipoProductos(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de tipos de productos:", error);
                setError("Error al obtener la lista de tipos de productos. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este tipo de producto?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/tipo_productos/${id}`)
            .then(res => {
                console.log(res.data);
                getListaTipoProductos(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el tipo de producto:", error);
                setError("Error al eliminar el tipo de producto. Inténtelo más tarde.");
            });
    };

    const editarTipoProducto = (id) => {
        navigate(`/tipo_producto/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Tipos de Productos</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaTipoProductos.map(tipoProducto => (
                                            <tr key={tipoProducto.id}>
                                                <td>{tipoProducto.id}</td>
                                                <td>{tipoProducto.nombre}</td>
                                                <td>{tipoProducto.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarTipoProducto(tipoProducto.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(tipoProducto.id)}
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

export default ListaTipoProducto;
