import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { useNavigate, useParams } from "react-router-dom";

const FormInventario = () => {
    const [productos, setProductos] = useState([]);
    const [compras, setCompras] = useState([]);
    const [productoId, setProductoId] = useState('');
    const [compraId, setCompraId] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');
    const [cantidadCompra, setCantidadCompra] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [estado, setEstado] = useState('Activo');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        cargarProductos();
        cargarCompras();
        if (id) {
            cargarInventario();
        }
    }, [id]);

    const cargarProductos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/productos');
            setProductos(res.data);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    const cargarCompras = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/compras');
            setCompras(res.data);
        } catch (error) {
            console.error("Error al cargar las compras:", error);
        }
    };

    const cargarInventario = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/inventarios/${id}`);
            const inventario = res.data;
            setProductoId(inventario.producto_id);
            setCompraId(inventario.compra_id);
            setPrecioCompra(inventario.precio_compra);
            setPrecioVenta(inventario.precio_venta);
            setStock(inventario.stock);
            setCantidadCompra(inventario.cantidad_compra);
            setFechaIngreso(inventario.fecha_ingreso);
            setEstado(inventario.estado === 1 ? "Activo" : "Inactivo");
        } catch (error) {
            console.error("Error al cargar el inventario:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inventario = {
            producto_id: productoId,
            compra_id: compraId,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            stock: stock,
            cantidad_compra: cantidadCompra,
            fecha_ingreso: fechaIngreso,
            estado: estado === "Activo" ? 1 : 0,
        };

        if (id) {
            axios.put(`http://127.0.0.1:8000/api/inventarios/${id}`, inventario)
                .then(res => {
                    console.log("Inventario actualizado:", res.data);
                    alert("Inventario actualizado exitosamente");
                    navigate('/inventariolist');
                }).catch(error => {
                    console.error("Error al actualizar el inventario:", error);
                    alert("Error al actualizar el inventario");
                });
        } else {
            axios.post('http://127.0.0.1:8000/api/inventarios', inventario)
                .then(res => {
                    console.log("Inventario guardado:", res.data);
                    alert("Inventario guardado exitosamente");
                    navigate('/inventariolist');
                }).catch(error => {
                    console.error("Error al guardar el inventario:", error);
                    alert("Error al guardar el inventario");
                });
        }
    };

    return (
        <>
            <NavMenu />
            <Container>
                <h2>{id ? "Editar Inventario" : "Crear Inventario"}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar Producto</Form.Label>
                        <Form.Select 
                            value={productoId} 
                            onChange={(e) => setProductoId(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {productos.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre} (ID: {producto.id})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Seleccionar Compra</Form.Label>
                        <Form.Select 
                            value={compraId} 
                            onChange={(e) => setCompraId(e.target.value)} 
                            required
                        >
                            <option value="">Seleccione una compra</option>
                            {compras.map(compra => (
                                <option key={compra.id} value={compra.id}>
                                    Compra ID: {compra.id} - Monto: {compra.monto_total}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Compra</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={precioCompra} 
                            onChange={(e) => setPrecioCompra(e.target.value)} 
                            placeholder="Ingrese el precio de compra" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Venta</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={precioVenta} 
                            onChange={(e) => setPrecioVenta(e.target.value)} 
                            placeholder="Ingrese el precio de venta" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            placeholder="Ingrese el stock" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad Compra</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={cantidadCompra} 
                            onChange={(e) => setCantidadCompra(e.target.value)} 
                            placeholder="Ingrese la cantidad comprada" 
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Ingreso</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={fechaIngreso} 
                            onChange={(e) => setFechaIngreso(e.target.value)} 
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

                    <Button type="submit">{id ? "Actualizar Inventario" : "Guardar Inventario"}</Button>
                </Form>
            </Container>
        </>
    );
};

export default FormInventario;
