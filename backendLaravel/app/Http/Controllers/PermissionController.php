<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index()
    {
        return Permission::all(); // Devuelve todos los permisos
    }

    public function store(Request $request)
    {
        $permission = Permission::create($request->all()); // Crea un nuevo permiso
        return response()->json($permission, 201);
    }

    public function show(Permission $permission)
    {
        return $permission; // Muestra un permiso específico
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->all()); // Actualiza un permiso
        return response()->json($permission, 200);
    }

    public function destroy(Permission $permission)
    {
        $permission->delete(); // Elimina un permiso
        return response()->json(null, 204);
    }
}

