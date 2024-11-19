<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;

    protected $fillable = [
        'producto_id',
        'compra_id',
        'precio_compra',
        'precio_venta',
        'stock',
        'cantidad_compra',
        'fecha_ingreso',
        'estado',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
