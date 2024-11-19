<?php

namespace App\Http\Controllers;

use App\Models\TipoServicio;
use Illuminate\Http\Request;

class TipoServicioController extends Controller
{
    public function index()
    {
        return TipoServicio::all(); // Devuelve todos los tipos de servicios
    }

    public function store(Request $request)
    {
        // Validar los datos enviados por el cliente
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255|unique:tipo_servicios',
            'estado' => 'required|boolean',       // El estado es requerido y debe ser booleano (1 o 0)
        ]);

        try {
            // Crear un nuevo tipo de servicio con los datos validados
            $tipoServicio = TipoServicio::create($validatedData);

            // Retornar respuesta JSON con los datos creados y el código de estado 201 (creado)
            return response()->json($tipoServicio, 201);
        } catch (\Exception $e) {
            // Retornar respuesta de error en caso de fallo
            return response()->json([
                'message' => 'Error al guardar el tipo de servicio.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(TipoServicio $tipoServicio)
    {
        return $tipoServicio; // Muestra un tipo de servicio específico
    }

    public function update(Request $request, TipoServicio $tipoServicio)
    {
        $tipoServicio->update($request->all()); // Actualiza un tipo de servicio
        return response()->json($tipoServicio, 200);
    }

    public function destroy(TipoServicio $tipoServicio)
    {
        $tipoServicio->delete(); // Elimina un tipo de servicio
        return response()->json(null, 204);
    }
}

