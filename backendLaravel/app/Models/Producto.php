<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_producto_id',
        'nombre',
        'descripcion',
        'estado',
    ];

    public function tipoProducto()
    {
        return $this->belongsTo(TipoProducto::class);
    }
}
