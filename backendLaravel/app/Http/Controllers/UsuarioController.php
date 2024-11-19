<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::with('persona')->get(); // Devuelve todos los usuarios con su relación persona
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'persona_id' => 'required|exists:personas,id', // Verifica que persona_id exista en la tabla personas
            'email' => 'required|email|unique:usuarios,email', // Asegúrate de que el email sea único en la tabla usuarios
            'password' => 'required',
            'estado' => 'required|string', // Acepta 'Activo' o 'Inactivo'
        ]);

        // Convierte el estado a un número
        $validatedData['estado'] = $validatedData['estado'] === 'Activo' ? 1 : 0;

        // Encripta la contraseña antes de guardar
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Crea el usuario
        $usuario = Usuario::create($validatedData);

        return response()->json($usuario, 201);
    }


    public function show(Usuario $usuario)
    {
        return $usuario->load('persona'); // Muestra un usuario específico con su relación persona
    }

    public function update(Request $request, Usuario $usuario)
    {
        $usuario->update($request->all()); // Actualiza un usuario
        return response()->json($usuario, 200);
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete(); // Elimina un usuario
        return response()->json(null, 204);
    }
}

