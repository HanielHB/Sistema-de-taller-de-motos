import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Alert } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom";

const ListaProducto = () => {
    const [listaProductos, setListaProductos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        getListaProductos();
        document.title = "Lista de Productos";
    }, []);

    const getListaProductos = () => {
        axios.get('http://127.0.0.1:8000/api/productos')
            .then(res => {
                setListaProductos(res.data);
            }).catch(error => {
                console.error("Error al obtener la lista de productos:", error);
                setError("Error al obtener la lista de productos. Inténtelo más tarde.");
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este producto?");
        if (!confirm) return;

        axios.delete(`http://127.0.0.1:8000/api/productos/${id}`)
            .then(res => {
                console.log(res.data);
                getListaProductos(); // Refresca la lista después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el producto:", error);
                setError("Error al eliminar el producto. Inténtelo más tarde.");
            });
    };

    const editarProducto = (id) => {
        navigate(`/producto/${id}`); // Redirigir a la página de edición
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
                                    <h2>Lista de Productos</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo de Producto</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaProductos.map(producto => (
                                            <tr key={producto.id}>
                                                <td>{producto.id}</td>
                                                <td>
                                                    {producto.tipo_producto ? producto.tipo_producto.nombre : "N/A"}
                                                </td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.descripcion}</td>
                                                <td>{producto.estado === 1 ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button 
                                                        variant="primary" 
                                                        onClick={() => editarProducto(producto.id)} 
                                                        className="me-2"
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={() => eliminar(producto.id)}
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

export default ListaProducto;
