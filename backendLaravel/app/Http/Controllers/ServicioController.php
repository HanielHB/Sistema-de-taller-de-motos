<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    public function index()
    {
        return Servicio::with('tipoServicio')->get(); // Devuelve todos los servicios con su relación tipo de servicio
    }

    public function store(Request $request)
    {
        $servicio = Servicio::create($request->all()); // Crea un nuevo servicio
        return response()->json($servicio, 201);
    }

    public function show(Servicio $servicio)
    {
        return $servicio->load('tipoServicio'); // Muestra un servicio específico
    }

    public function update(Request $request, Servicio $servicio)
    {
        $servicio->update($request->all()); // Actualiza un servicio
        return response()->json($servicio, 200);
    }

    public function destroy(Servicio $servicio)
    {
        $servicio->delete(); // Elimina un servicio
        return response()->json(null, 204);
    }
}

