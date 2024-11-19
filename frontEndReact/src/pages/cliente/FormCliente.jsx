import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom"; // Importar useNavigate y useParams

const FormCliente = () => {
    const [personas, setPersonas] = useState([]);
    const [personaId, setPersonaId] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [nit, setNit] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate(); // Hook para redirigir
    const { id } = useParams(); // Obtener el ID del cliente desde la URL

    useEffect(() => {
        cargarPersonas();
        if (id) {
            cargarCliente(); // Cargar los datos del cliente si se está editando
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

    const cargarCliente = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/clientes/${id}`);
            const cliente = res.data;
            setPersonaId(cliente.persona_id);
            setRazonSocial(cliente.razon_social);
            setNit(cliente.nit);
            setEstado(cliente.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el cliente:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cliente = {
            persona_id: personaId,
            razon_social: razonSocial,
            nit: nit,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            // Editar cliente existente
            axios.put(`http://127.0.0.1:8000/api/clientes/${id}`, cliente)
                .then(res => {
                    console.log("Cliente actualizado:", res.data);
                    alert("Cliente actualizado exitosamente");
                    navigate('/clientelist'); // Redirigir a la lista de clientes
                }).catch(error => {
                    console.error("Error al actualizar el cliente:", error);
                    alert("Error al actualizar el cliente");
                });
        } else {
            // Crear nuevo cliente
            axios.post('http://127.0.0.1:8000/api/clientes', cliente)
                .then(res => {
                    console.log("Cliente guardado:", res.data);
                    alert("Cliente guardado exitosamente");
                    navigate('/clientelist'); // Redirigir a la lista de clientes
                }).catch(error => {
                    console.error("Error al guardar el cliente:", error);
                    alert("Error al guardar el cliente");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Cliente" : "Crear Cliente"}</h2>
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

                    <Button type="submit">{id ? "Actualizar Cliente" : "Guardar Cliente"}</Button>
                </Form>
            </Container>
        </>    
    );
};

export default FormCliente;
