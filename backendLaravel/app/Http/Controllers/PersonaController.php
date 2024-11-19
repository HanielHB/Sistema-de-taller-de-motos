<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function index()
    {
        return Persona::all(); // Devuelve todas las personas
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'ci' => 'required|string|max:20|unique:personas',
            'correo_personal' => 'required|email|max:255|unique:personas',
            'celular' => 'required',
            'estado' => 'required|string', // Acepta 'Activo' o 'Inactivo'
        ]);

        // Convierte el estado a un número
        $validatedData['estado'] = $validatedData['estado'] === 'Activo' ? 1 : 0;

        $persona = Persona::create($validatedData);

        return response()->json($persona, 201);
    }


    public function show(Persona $persona)
    {
        return $persona; // Muestra una persona específica
    }

    public function update(Request $request, Persona $persona)
    {
        $persona->update($request->all()); // Actualiza una persona
        return response()->json($persona, 200);
    }

    public function destroy(Persona $persona)
    {
        $persona->delete(); // Elimina una persona
        return response()->json(null, 204);
    }
}


