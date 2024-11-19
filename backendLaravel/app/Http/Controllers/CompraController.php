<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use Illuminate\Http\Request;

class CompraController extends Controller
{
    public function index()
    {
        return Compra::with('proveedor')->get(); // Devuelve todas las compras con su relación proveedor
    }

    public function store(Request $request)
    {
        $compra = Compra::create($request->all()); // Crea una nueva compra
        return response()->json($compra, 201);
    }

    public function show(Compra $compra)
    {
        return $compra->load('proveedor'); // Muestra una compra específica con su relación proveedor
    }

    public function update(Request $request, Compra $compra)
    {
        $compra->update($request->all()); // Actualiza la información de una compra
        return response()->json($compra, 200);
    }

    public function destroy(Compra $compra)
    {
        $compra->delete(); // Elimina una compra
        return response()->json(null, 204);
    }
}

