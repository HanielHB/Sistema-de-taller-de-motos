<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RolUsuario extends Pivot
{
    use HasFactory;

    protected $table = 'rolUsuario';

    protected $fillable = [
        'usuario_id',
        'role_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
