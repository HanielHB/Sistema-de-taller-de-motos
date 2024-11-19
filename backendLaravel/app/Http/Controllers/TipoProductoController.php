<?php

namespace App\Http\Controllers;

use App\Models\TipoProducto;
use Illuminate\Http\Request;

class TipoProductoController extends Controller
{
    public function index()
    {
        return TipoProducto::all(); // Devuelve todos los tipos de productos
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'estado' => 'required|boolean',
        ]);

        $tipoProducto = TipoProducto::create($validatedData);

        return response()->json($tipoProducto, 201);
    }

    public function show($id)
    {
        return TipoProducto::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'estado' => 'required|boolean',
        ]);

        $tipoProducto = TipoProducto::findOrFail($id);
        $tipoProducto->update($validatedData);

        return response()->json($tipoProducto, 200);
    }

    public function destroy(TipoProducto $tipoProducto)
    {
        $tipoProducto->delete(); // Elimina un tipo de producto
        return response()->json(null, 204);
    }
}

