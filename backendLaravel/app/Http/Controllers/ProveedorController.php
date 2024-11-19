<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function index()
    {
        return Proveedor::with('persona')->get(); // Incluye los datos de la persona asociada
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'razon_social' => 'required|string|max:255',
            'nit' => 'required|string|max:20|unique:proveedors',
            'estado' => 'required|boolean',
        ]);

        $proveedor = Proveedor::create($validatedData);

        return response()->json($proveedor, 201);
    }

    public function show($id)
    {
        return Proveedor::with('persona')->findOrFail($id); // Incluye los datos de la persona asociada
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'persona_id' => 'required|exists:personas,id',
            'razon_social' => 'required|string|max:255',
            'nit' => 'required|string|max:20|unique:proveedors,nit,' . $id,
            'estado' => 'required|boolean',
        ]);

        $proveedor = Proveedor::findOrFail($id);
        $proveedor->update($validatedData);

        return response()->json($proveedor, 200);
    }

    public function destroy($id)
    {
        $proveedor = Proveedor::findOrFail($id);
        $proveedor->delete();

        return response()->json(['message' => 'Proveedor eliminado con éxito'], 200);
    }
}
