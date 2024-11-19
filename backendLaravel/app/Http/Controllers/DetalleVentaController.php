<?php

namespace App\Http\Controllers;

use App\Models\DetalleVenta;
use Illuminate\Http\Request;

class DetalleVentaController extends Controller
{
    public function index()
    {
        return DetalleVenta::with('venta', 'inventario')->get(); // Devuelve todos los detalles de ventas
    }

    public function store(Request $request)
    {
        $detalleVenta = DetalleVenta::create($request->all()); // Crea un nuevo detalle de venta
        return response()->json($detalleVenta, 201);
    }

    public function show(DetalleVenta $detalleVenta)
    {
        return $detalleVenta->load('venta', 'inventario'); // Muestra un detalle de venta específico
    }

    public function update(Request $request, DetalleVenta $detalleVenta)
    {
        $detalleVenta->update($request->all()); // Actualiza un detalle de venta
        return response()->json($detalleVenta, 200);
    }

    public function destroy(DetalleVenta $detalleVenta)
    {
        $detalleVenta->delete(); // Elimina un detalle de venta
        return response()->json(null, 204);
    }
}

