import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container, Modal, Card } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs"; // Ícono de éxito

const FormTipoServicio = () => {
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const navigate = useNavigate(); // Hook para redirigir
    const { id } = useParams(); // Obtener el ID del TipoServicio desde la URL

    useEffect(() => {
        if (id) {
            cargarTipoServicio(); // Cargar los datos del TipoServicio si se está editando
        }
    }, [id]);

    const cargarTipoServicio = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/tipo_servicios/${id}`);
            const tipoServicio = res.data;
            setNombre(tipoServicio.nombre);
            setEstado(tipoServicio.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el Tipo de Servicio:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tipoServicio = {
            nombre: nombre,
            estado: estado === "Activo" ? 1 : 0,
        };

        const saveOrUpdate = id
            ? axios.put(`http://127.0.0.1:8000/api/tipo_servicios/${id}`, tipoServicio)
            : axios.post('http://127.0.0.1:8000/api/tipo_servicios', tipoServicio);

        saveOrUpdate
            .then(res => {
                console.log("Tipo de Servicio guardado/actualizado:", res.data);
                setShowModal(true); // Mostrar el modal de éxito
            })
            .catch(error => {
                console.error("Error al guardar/actualizar el Tipo de Servicio:", error);
                alert("Error al guardar/actualizar el Tipo de Servicio");
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/tipo_serviciolist'); // Redirigir a la lista después de cerrar el modal
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2 className="text-primary mb-4">
                            {id ? "Editar Tipo de Servicio" : "Crear Tipo de Servicio"}
                        </h2>
                        <p className="text-muted">
                            {id
                                ? "Actualiza la información del tipo de servicio seleccionado."
                                : "Completa los campos para crear un nuevo tipo de servicio."}
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Ingrese el nombre del tipo de servicio"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Estado</Form.Label>
                                <Form.Select
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    required
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </Form.Select>
                            </Form.Group>

                            <Button type="submit" className="w-100 btn-primary">
                                {id ? "Actualizar Tipo de Servicio" : "Guardar Tipo de Servicio"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {/* Modal de éxito */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <BsCheckCircle className="text-success me-2" />
                        {id ? "Actualización Exitosa" : "Guardado Correctamente"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        El tipo de servicio <strong>{nombre}</strong> se ha{" "}
                        {id ? "actualizado" : "guardado"} exitosamente.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FormTipoServicio;
