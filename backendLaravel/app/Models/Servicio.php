<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_servicio_id',
        'nombre',
        'descripcion',
        'precio',
        'estado',
    ];

    public function tipoServicio()
    {
        return $this->belongsTo(TipoServicio::class);
    }
}

