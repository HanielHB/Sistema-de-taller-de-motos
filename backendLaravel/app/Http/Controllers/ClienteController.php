<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        return Cliente::with('persona')->get(); // Incluye los datos de la persona asociada
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'razon_social' => 'required|string|max:255',
            'nit' => 'required|string|max:20|unique:clientes,nit',
            'estado' => 'required|string'
        ]);

        $validatedData['estado'] = $validatedData['estado'] === 'Activo' ? 1 : 0;

        $cliente = Cliente::create($validatedData);

        return response()->json($cliente, 201);
    }


    public function show($id)
    {
        return Cliente::with('persona')->findOrFail($id); // Incluye los datos de la persona asociada
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'razon_social' => 'required|string|max:255',
            'nit' => 'required|string|max:20|unique:clientes,nit,' . $id,
            'estado' => 'required|boolean',
        ]);

        $cliente = Cliente::findOrFail($id);
        $cliente->update($validatedData);

        return response()->json($cliente, 200);
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete(); // Elimina un cliente
        return response()->json(null, 204);
    }
}
