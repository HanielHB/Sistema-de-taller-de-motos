import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom";

const FormProducto = () => {
    const [tipoProductos, setTipoProductos] = useState([]);
    const [tipoProductoId, setTipoProductoId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        cargarTipoProductos();
        if (id) {
            cargarProducto();
        }
    }, [id]);

    const cargarTipoProductos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/tipo_productos');
            setTipoProductos(res.data);
        } catch (error) {
            console.error("Error al cargar los tipos de productos:", error);
        }
    };

    const cargarProducto = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/productos/${id}`);
            const producto = res.data;
            setTipoProductoId(producto.tipo_producto_id);
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setEstado(producto.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el producto:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const producto = {
            tipo_producto_id: tipoProductoId,
            nombre: nombre,
            descripcion: descripcion,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            // Editar producto existente
            axios.put(`http://127.0.0.1:8000/api/productos/${id}`, producto)
                .then(res => {
                    console.log("Producto actualizado:", res.data);
                    alert("Producto actualizado exitosamente");
                    navigate('/productolist');
                }).catch(error => {
                    console.error("Error al actualizar el producto:", error);
                    alert("Error al actualizar el producto");
                });
        } else {
            // Crear nuevo producto
            axios.post('http://127.0.0.1:8000/api/productos', producto)
                .then(res => {
                    console.log("Producto guardado:", res.data);
                    alert("Producto guardado exitosamente");
                    navigate('/productolist');
                }).catch(error => {
                    console.error("Error al guardar el producto:", error);
                    alert("Error al guardar el producto");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Producto</Form.Label>
                        <Form.Select
                            value={tipoProductoId}
                            onChange={(e) => setTipoProductoId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un tipo de producto</option>
                            {tipoProductos.map(tipoProducto => (
                                <option key={tipoProducto.id} value={tipoProducto.id}>
                                    {tipoProducto.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingrese el nombre del producto"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ingrese una descripción del producto"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit">{id ? "Actualizar Producto" : "Guardar Producto"}</Button>
                </Form>
            </Container>
        </>
    );
};

export default FormProducto;
