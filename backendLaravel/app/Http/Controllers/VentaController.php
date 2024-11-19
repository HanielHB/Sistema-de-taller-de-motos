<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    public function index()
    {
        return Venta::with('cliente', 'detalles')->get(); // Devuelve todas las ventas con su relación cliente y detalles
    }

    public function store(Request $request)
    {
        $venta = Venta::create($request->all()); // Crea una nueva venta
        return response()->json($venta, 201);
    }

    public function show(Venta $venta)
    {
        return $venta->load('cliente', 'detalles'); // Muestra una venta específica
    }

    public function update(Request $request, Venta $venta)
    {
        $venta->update($request->all()); // Actualiza una venta
        return response()->json($venta, 200);
    }

    public function destroy(Venta $venta)
    {
        $venta->delete(); // Elimina una venta
        return response()->json(null, 204);
    }
}
