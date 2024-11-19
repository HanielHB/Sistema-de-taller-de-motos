<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    public function index()
    {
        return Inventario::with('producto')->get(); // Devuelve todos los inventarios con su relación producto
    }

    public function store(Request $request)
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'compra_id' => 'nullable|exists:compras,id',
            'precio_compra' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'cantidad_compra' => 'required|integer|min:0',
            'fecha_ingreso' => 'required|date',
            'estado' => 'required|boolean', // 1 = Activo, 0 = Inactivo
        ]);

        // Crear un nuevo registro en la tabla de inventarios
        $inventario = Inventario::create($validatedData);

        // Retornar la respuesta en formato JSON
        return response()->json($inventario, 201);
    }


    public function show(Inventario $inventario)
    {
        return $inventario->load('producto'); // Muestra un inventario específico
    }

    public function update(Request $request, Inventario $inventario)
    {
        $inventario->update($request->all()); // Actualiza la información de un inventario
        return response()->json($inventario, 200);
    }

    public function destroy(Inventario $inventario)
    {
        $inventario->delete(); // Elimina un inventario
        return response()->json(null, 204);
    }
}

