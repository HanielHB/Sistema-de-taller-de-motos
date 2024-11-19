<?php

namespace App\Http\Controllers;

use App\Models\Rol_usuario;
use App\Models\RolUsuario;
use Illuminate\Http\Request;

class RolUsuarioController extends Controller
{
    public function store(Request $request)
    {
        $rolUsuario = RolUsuario::create($request->all()); // Asigna un rol a un usuario
        return response()->json($rolUsuario, 201);
    }

    public function destroy(Request $request)
    {
        $rolUsuario = RolUsuario::where('usuario_id', $request->usuario_id)
            ->where('rol_id', $request->rol_id)
            ->first();
        if ($rolUsuario) {
            $rolUsuario->delete(); // Elimina la asignación de rol de un usuario
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'Rol no encontrado'], 404);
        }
    }
}
