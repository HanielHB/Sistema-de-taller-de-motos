import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Estado de formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ci: '',
        correo_personal: '',
        celular: '',
        estado: ''
    });

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            getPersonaById();
        }
    }, [id]);

    const getPersonaById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/personas/${id}`);
            setFormData(data);
        } catch (error) {
            console.error("Error al cargar la persona:", error); // Imprime el error en la consola para más detalles
            setError('Error al cargar la persona. Inténtelo más tarde.');
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onGuardarClick = async (e) => {
        e.preventDefault();
        setValidated(true);

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        setLoading(true);

        try {
            if (id) {
                await axios.put(`http://localhost:8000/api/personas/${id}`, formData);
            } else {
                await axios.post('http://127.0.0.1:8000/api/personas/create', formData);
            }
            navigate('/personas');
        } catch (error) {
            console.error("Error al guardar la persona:", error); 
            setError('Error al guardar la persona. Inténtelo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <Row className="mt-4">
                    <Col md={{ span: 8, offset: 2 }}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title className="mb-4">
                                    <h3 className="text-center">Formulario de Persona</h3>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control
                                            required
                                            name="nombre"
                                            type="text"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Apellido:</Form.Label>
                                        <Form.Control
                                            required
                                            name="apellido"
                                            type="text"
                                            value={formData.apellido}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el apellido.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>CI:</Form.Label>
                                        <Form.Control
                                            required
                                            name="ci"
                                            type="text"
                                            value={formData.ci}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el CI.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Correo Personal:</Form.Label>
                                        <Form.Control
                                            required
                                            name="correo_personal"
                                            type="email"
                                            value={formData.correo_personal}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un correo válido.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Celular:</Form.Label>
                                        <Form.Control
                                            required
                                            name="celular"
                                            type="text"
                                            value={formData.celular}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el número de celular.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Estado:</Form.Label>
                                        <Form.Select
                                            required
                                            name="estado"
                                            value={formData.estado}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Seleccione el estado</option>
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un estado.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="text-center">
                                        <Button type="submit" disabled={loading}>
                                            {loading ? 'Guardando...' : 'Guardar Persona'}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormPersona;
