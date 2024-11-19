import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom"; // Importar useNavigate y useParams

const FormTipoProducto = () => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate(); // Hook para redirigir
    const { id } = useParams(); // Obtener el ID del TipoProducto desde la URL

    useEffect(() => {
        if (id) {
            cargarTipoProducto(); // Cargar los datos del TipoProducto si se está editando
        }
    }, [id]);

    const cargarTipoProducto = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/tipo_productos/${id}`);
            const tipoProducto = res.data;
            setNombre(tipoProducto.nombre);
            setEstado(tipoProducto.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el Tipo de Producto:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tipoProducto = {
            nombre: nombre,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            // Editar TipoProducto existente
            axios.put(`http://127.0.0.1:8000/api/tipo_productos/${id}`, tipoProducto)
                .then(res => {
                    console.log("Tipo de Producto actualizado:", res.data);
                    alert("Tipo de Producto actualizado exitosamente");
                    navigate('/tipo_productolist'); // Redirigir a la lista de Tipos de Productos
                }).catch(error => {
                    console.error("Error al actualizar el Tipo de Producto:", error);
                    alert("Error al actualizar el Tipo de Producto");
                });
        } else {
            // Crear nuevo TipoProducto
            axios.post('http://127.0.0.1:8000/api/tipo_productos', tipoProducto)
                .then(res => {
                    console.log("Tipo de Producto guardado:", res.data);
                    alert("Tipo de Producto guardado exitosamente");
                    navigate('/tipo_productolist'); // Redirigir a la lista de Tipos de Productos
                }).catch(error => {
                    console.error("Error al guardar el Tipo de Producto:", error);
                    alert("Error al guardar el Tipo de Producto");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Tipo de Producto" : "Crear Tipo de Producto"}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            placeholder="Ingrese el nombre del tipo de producto" 
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

                    <Button type="submit">{id ? "Actualizar Tipo de Producto" : "Guardar Tipo de Producto"}</Button>
                </Form>
            </Container>
        </>    
    );
};

export default FormTipoProducto;
