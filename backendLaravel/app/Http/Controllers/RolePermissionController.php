<?php

namespace App\Http\Controllers;

use App\Models\RolePermission;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    public function store(Request $request)
    {
        $rolePermission = RolePermission::create($request->all()); // Asigna un permiso a un rol
        return response()->json($rolePermission, 201);
    }

    public function destroy(Request $request)
    {
        $rolePermission = RolePermission::where('role_id', $request->role_id)
            ->where('permission_id', $request->permission_id)
            ->first();
        if ($rolePermission) {
            $rolePermission->delete(); // Elimina la asignación de permiso de un rol
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'Permiso no encontrado'], 404);
        }
    }
}
