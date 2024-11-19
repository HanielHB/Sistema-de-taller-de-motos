import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom"; // Importar useNavigate y useParams

const FormCompra = () => {
    const [proveedores, setProveedores] = useState([]);
    const [proveedorId, setProveedorId] = useState('');
    const [montoTotal, setMontoTotal] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate(); // Hook para redirigir
    const { id } = useParams(); // Obtener el ID de la compra desde la URL

    useEffect(() => {
        cargarProveedores();
        if (id) {
            cargarCompra(); // Cargar los datos de la compra si se está editando
        }
    }, [id]);

    const cargarProveedores = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/proveedores');
            setProveedores(res.data);
        } catch (error) {
            console.error("Error al cargar la lista de proveedores:", error);
        }
    };

    const cargarCompra = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/compras/${id}`);
            const compra = res.data;
            setProveedorId(compra.proveedor_id);
            setMontoTotal(compra.monto_total);
            setEstado(compra.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar la compra:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const compra = {
            proveedor_id: proveedorId,
            monto_total: montoTotal,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            // Editar compra existente
            axios.put(`http://127.0.0.1:8000/api/compras/${id}`, compra)
                .then(res => {
                    console.log("Compra actualizada:", res.data);
                    alert("Compra actualizada exitosamente");
                    navigate('/compralist'); // Redirigir a la lista de compras
                }).catch(error => {
                    console.error("Error al actualizar la compra:", error);
                    alert("Error al actualizar la compra");
                });
        } else {
            // Crear nueva compra
            axios.post('http://127.0.0.1:8000/api/compras', compra)
                .then(res => {
                    console.log("Compra guardada:", res.data);
                    alert("Compra guardada exitosamente");
                    navigate('/compralist'); // Redirigir a la lista de compras
                }).catch(error => {
                    console.error("Error al guardar la compra:", error);
                    alert("Error al guardar la compra");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Compra" : "Crear Compra"}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar Proveedor</Form.Label>
                        <Form.Select 
                            value={proveedorId} 
                            onChange={(e) => setProveedorId(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione un proveedor</option>
                            {proveedores.map(proveedor => (
                                <option key={proveedor.id} value={proveedor.id}>
                                    {proveedor.razon_social} (ID: {proveedor.id})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Monto Total</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={montoTotal} 
                            onChange={(e) => setMontoTotal(e.target.value)} 
                            placeholder="Ingrese el monto total" 
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

                    <Button type="submit">{id ? "Actualizar Compra" : "Guardar Compra"}</Button>
                </Form>
            </Container>
        </>
    );
};

export default FormCompra;
