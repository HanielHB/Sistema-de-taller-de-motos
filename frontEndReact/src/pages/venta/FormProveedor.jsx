import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom"; // Importar useNavigate y useParams

const FormProveedor = () => {
    const [personas, setPersonas] = useState([]);
    const [personaId, setPersonaId] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [nit, setNit] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate(); // Hook para redirigir
    const { id } = useParams(); // Obtener el ID del proveedor desde la URL

    useEffect(() => {
        cargarPersonas();
        if (id) {
            cargarProveedor(); // Cargar los datos del proveedor si se está editando
        }
    }, [id]);

    const cargarPersonas = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/personas');
            setPersonas(res.data);
        } catch (error) {
            console.error("Error al cargar la lista de personas:", error);
        }
    };

    const cargarProveedor = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/proveedores/${id}`);
            const proveedor = res.data;
            setPersonaId(proveedor.persona_id);
            setRazonSocial(proveedor.razon_social);
            setNit(proveedor.nit);
            setEstado(proveedor.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el proveedor:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const proveedor = {
            persona_id: personaId,
            razon_social: razonSocial,
            nit: nit,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            // Editar proveedor existente
            axios.put(`http://127.0.0.1:8000/api/proveedores/${id}`, proveedor)
                .then(res => {
                    console.log("Proveedor actualizado:", res.data);
                    alert("Proveedor actualizado exitosamente");
                    navigate('/proveedorlist'); // Redirigir a la lista de proveedores
                }).catch(error => {
                    console.error("Error al actualizar el proveedor:", error);
                    alert("Error al actualizar el proveedor");
                });
        } else {
            // Crear nuevo proveedor
            axios.post('http://127.0.0.1:8000/api/proveedores', proveedor)
                .then(res => {
                    console.log("Proveedor guardado:", res.data);
                    alert("Proveedor guardado exitosamente");
                    navigate('/proveedorlist'); // Redirigir a la lista de proveedores
                }).catch(error => {
                    console.error("Error al guardar el proveedor:", error);
                    alert("Error al guardar el proveedor");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Proveedor" : "Crear Proveedor"}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar Persona</Form.Label>
                        <Form.Select 
                            value={personaId} 
                            onChange={(e) => setPersonaId(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione una persona</option>
                            {personas.map(persona => (
                                <option key={persona.id} value={persona.id}>
                                    {persona.nombre} {persona.apellido} (ID: {persona.id})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Razón Social</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={razonSocial} 
                            onChange={(e) => setRazonSocial(e.target.value)} 
                            placeholder="Ingrese la razón social" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={nit} 
                            onChange={(e) => setNit(e.target.value)} 
                            placeholder="Ingrese el NIT" 
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

                    <Button type="submit">{id ? "Actualizar Proveedor" : "Guardar Proveedor"}</Button>
                </Form>
            </Container>
        </>    
    );
};

export default FormProveedor;
