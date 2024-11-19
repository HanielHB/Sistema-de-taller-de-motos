import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const FormUsuario = () => {
    const [personas, setPersonas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [personaId, setPersonaId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        // Cargar lista de personas y usuarios al montar el componente
        cargarPersonasYUsuarios();
    }, []);

    const cargarPersonasYUsuarios = async () => {
        try {
            const [resPersonas, resUsuarios] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/personas'),
                axios.get('http://127.0.0.1:8000/api/usuarios')
            ]);

            setUsuarios(resUsuarios.data);

            // Filtrar personas cuyo correo no está registrado en usuarios
            const correosRegistrados = resUsuarios.data.map((usuario) => usuario.email);
            const personasFiltradas = resPersonas.data.filter(
                (persona) => !correosRegistrados.includes(persona.correo_personal)
            );

            setPersonas(personasFiltradas);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        // Cargar el correo de la persona seleccionada
        if (personaId) {
            axios.get(`http://127.0.0.1:8000/api/personas/${personaId}`)
                .then(res => {
                    setEmail(res.data.correo_personal);
                }).catch(error => {
                    console.error("Error al obtener los detalles de la persona:", error);
                    setEmail(''); // Limpia el correo si hay un error
                });
        }
    }, [personaId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const usuario = {
            persona_id: personaId,
            email: email,
            password: password,
            estado: estado
        };

        // Guardar usuario en la base de datos
        axios.post('http://127.0.0.1:8000/api/usuarios', usuario)
            .then(res => {
                console.log("Usuario guardado:", res.data);
                alert("Usuario guardado exitosamente");
                navigate('/usuariolist'); // Redirigir a la lista de usuarios
            }).catch(error => {
                console.error("Error al guardar el usuario:", error);
                alert("Error al guardar el usuario");
            });
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>Formulario de Usuario</h2>
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
                        <Form.Label>Correo</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            readOnly 
                            placeholder="Correo de la persona seleccionada"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
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

                    <Button type="submit">Guardar Usuario</Button>
                </Form>
            </Container>
        </>    
    );
};

export default FormUsuario;
