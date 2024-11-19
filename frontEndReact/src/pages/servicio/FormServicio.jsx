import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom";

const FormServicio = () => {
    const [tipoServicios, setTipoServicios] = useState([]);
    const [tipoServicioId, setTipoServicioId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del servicio desde la URL

    useEffect(() => {
        cargarTipoServicios();
        if (id) {
            cargarServicio(); // Cargar los datos del servicio si se está editando
        }
    }, [id]);

    const cargarTipoServicios = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/tipo_servicios');
            setTipoServicios(res.data);
        } catch (error) {
            console.error("Error al cargar los tipos de servicios:", error);
        }
    };

    const cargarServicio = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/servicios/${id}`);
            const servicio = res.data;
            setTipoServicioId(servicio.tipo_servicio_id);
            setNombre(servicio.nombre);
            setDescripcion(servicio.descripcion);
            setPrecio(servicio.precio);
            setEstado(servicio.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el servicio:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const servicio = {
            tipo_servicio_id: tipoServicioId,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            estado: estado === "Activo" ? 1 : 0,
        };

        const saveOrUpdate = id
            ? axios.put(`http://127.0.0.1:8000/api/servicios/${id}`, servicio)
            : axios.post('http://127.0.0.1:8000/api/servicios', servicio);

        saveOrUpdate
            .then(res => {
                console.log("Servicio guardado/actualizado:", res.data);
                alert(id ? "Servicio actualizado exitosamente" : "Servicio guardado exitosamente");
                navigate('/serviciolist');
            })
            .catch(error => {
                console.error("Error al guardar/actualizar el servicio:", error);
                alert("Error al guardar/actualizar el servicio");
            });
    };

    return (
        <>
            <NavMenu />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2 className="text-primary mb-4">{id ? "Editar Servicio" : "Crear Servicio"}</h2>
                        <p className="text-muted">
                            {id
                                ? "Actualiza la información del servicio seleccionado."
                                : "Completa los campos para crear un nuevo servicio."}
                        </p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Tipo de Servicio</Form.Label>
                                <Form.Select
                                    value={tipoServicioId}
                                    onChange={(e) => setTipoServicioId(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un tipo de servicio</option>
                                    {tipoServicios.map(tipoServicio => (
                                        <option key={tipoServicio.id} value={tipoServicio.id}>
                                            {tipoServicio.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Ingrese el nombre del servicio"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Ingrese una descripción del servicio"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    placeholder="Ingrese el precio del servicio"
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
                                {id ? "Actualizar Servicio" : "Guardar Servicio"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default FormServicio;
