<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return Role::all(); // Devuelve todos los roles
    }

    public function store(Request $request)
    {
        $role = Role::create($request->all()); // Crea un nuevo rol
        return response()->json($role, 201);
    }

    public function show(Role $role)
    {
        return $role; // Muestra un rol específico
    }

    public function update(Request $request, Role $role)
    {
        $role->update($request->all()); // Actualiza un rol
        return response()->json($role, 200);
    }

    public function destroy(Role $role)
    {
        $role->delete(); // Elimina un rol
        return response()->json(null, 204);
    }
}
