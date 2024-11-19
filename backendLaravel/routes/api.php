<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\TipoServicioController;
use App\Http\Controllers\TipoProductoController;
use App\Http\Controllers\DetalleVentaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolUsuarioController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
//
///*
//|--------------------------------------------------------------------------
//| API Routes
//|--------------------------------------------------------------------------
//|
//| Here is where you can register API routes for your application. These
//| routes are loaded by the RouteServiceProvider within a group which
//| is assigned the "api" middleware group. Enjoy building your API!
//|
//*/
//
////Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
////    return $request->user();
////});
////
//////auth routes
//////Route::post("/register", [AuthController::class, "register"])->name("register");
//////Route::post("/login", [AuthController::class, "login"])->name("login");
//////Route::post("/upload", [AuthController::class, "upload"])->name("upload");
//////Route::get("/user", [AuthController::class, "user"])->name("user");
//////Route::middleware('auth:sanctum')->get("/usuarios", [AuthController::class, "getUsuarios"])->name("usuarios");
//////Route::middleware('auth:sanctum')->get("/getUsuariosTablero/{id}", [AuthController::class, "getUsuariosTablero"])->name("getUsuariosTablero");
////
//////tablero routes
////Route::middleware('auth:sanctum')->get("/tablero", [TableroController::class, "indexPriv"])->name("tablero.indexPriv");
////Route::get("/tableroPublic", [TableroController::class, "indexPubl"])->name("tablero.indexPubl");
////Route::get("/tablero/{id}", [TableroController::class, "show"])->name("tablero.show");
////Route::middleware('auth:sanctum')->post("/tablero", [TableroController::class, "store"])->name("tablero.store");
////Route::middleware('auth:sanctum')->post("/tableroAddMember/{idUser}/{idTablero}", [TableroController::class, "agregarMiembro"])->name("tablero.agregarMiembro");
////Route::middleware('auth:sanctum')->delete("/tableroDelMember/{idUser}/{idTablero}", [TableroController::class, "eliminarMiembro"])->name("tablero.eliminarMiembro");
////Route::middleware('auth:sanctum')->put("/tablero/{id}", [TableroController::class, "update"])->name("tablero.updatePut");
////Route::middleware('auth:sanctum')->patch("/tablero/{id}", [TableroController::class, "update"])->name("tablero.updatePatch");
////Route::middleware('auth:sanctum')->delete("/tablero/{id}", [TableroController::class, "destroy"])->name("tablero.destroy");
////
//////lista routes
////Route::get("/tablero/lista/{idTablero}", [ListaController::class, "index"])->name("lista.index");
////Route::middleware('auth:sanctum')->post("/tablero/lista/{idTablero}", [ListaController::class, "store"])->name("lista.store");
////Route::middleware('auth:sanctum')->put("/tablero/listaEdit/{id}", [ListaController::class, "update"])->name("lista.updatePut");
////Route::middleware('auth:sanctum')->delete("/tablero/lista/{id}", [ListaController::class, "destroy"])->name("lista.destroy");
////
////
//////tarjeta routes
////
////Route::middleware('auth:sanctum')->post("/tarjeta/imagen/{idTarjeta}", [TarjetaController::class, "uploadImage"])->name("tarjeta.uploadImage");
////Route::middleware('auth:sanctum')->get("/tablero/lista/tarjeta/{idLista}", [TarjetaController::class, "index"])->name("tarjeta.index");
////Route::middleware('auth:sanctum')->get("/tablero/lista/tarjetaShow/{id}", [TarjetaController::class, "show"])->name("tarjeta.show");
////Route::middleware('auth:sanctum')->post("/tablero/lista/tarjeta/{idLista}", [TarjetaController::class, "store"])->name("tarjeta.store");
////Route::middleware('auth:sanctum')->put("/tablero/lista/tarjetaEdit/{id}", [TarjetaController::class, "update"])->name("tarjeta.updatePut");
////Route::middleware('auth:sanctum')->patch("/tablero/lista/tarjetaEdit/{id}", [TarjetaController::class, "update"])->name("tarjeta.updatePut");
////Route::middleware('auth:sanctum')->delete("/tablero/lista/tarjeta/{id}", [TarjetaController::class, "destroy"])->name("tarjeta.destroy");
////Route::middleware('auth:sanctum')->post("/tablero/lista/tarjeta/{idTarjeta}/{idUser}", [TarjetaController::class, "asignarUsuario"])->name("tarjeta.asignarUsuario");
////
//


// RF1 l


// RF2
Route::post('/roles', [RoleController::class, 'store']);
Route::post('/permissions', [PermissionController::class, 'store']);
Route::post('/rolUsuario', [RolUsuarioController::class, 'store']);
Route::post('/rolePermission', [RolePermissionController::class, 'store']);

// RF3 l
Route::post('/clientes', [ClienteController::class, 'store']);

// RF4
Route::post('/tipoProductos', [TipoProductoController::class, 'store']);

// RF5
Route::post('/productos', [ProductoController::class, 'store']);

// RF6


// RF7



// RF8
Route::get('/ventas', [VentaController::class, 'index']);

// RF9
Route::post('/tipoServicios', [TipoServicioController::class, 'store']);

// RF10
Route::post('/compras', [CompraController::class, 'store']);

// RF11
Route::get('/productos', [ProductoController::class, 'index']);

// RF12
Route::post('/clientes', [ClienteController::class, 'store']);

// RF13
Route::post('/ventas', [VentaController::class, 'store']);

// RF14
Route::get('/ventas/{venta}', [VentaController::class, 'show']);

// RF15
Route::get('/productos', [ProductoController::class, 'index']);

// RF16
Route::get('/usuarios/{usuario}', [UsuarioController::class, 'show']);

// RF17
Route::post('/servicios', [ServicioController::class, 'store']);

// RF18
Route::post('/clientes', [ClienteController::class, 'store']);





// Rutas para los usuarios
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios/{usuario}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{usuario}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{usuario}', [UsuarioController::class, 'destroy']);

// Rutas para los roles
Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::get('/roles/{role}', [RoleController::class, 'show']);
Route::put('/roles/{role}', [RoleController::class, 'update']);
Route::delete('/roles/{role}', [RoleController::class, 'destroy']);

// Rutas para los permisos
Route::get('/permissions', [PermissionController::class, 'index']);
Route::post('/permissions', [PermissionController::class, 'store']);
Route::get('/permissions/{permission}', [PermissionController::class, 'show']);
Route::put('/permissions/{permission}', [PermissionController::class, 'update']);
Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy']);

// Rutas para la asignación de roles a los usuarios
Route::post('rolUsuario', [RolUsuarioController::class, 'store']);
Route::delete('rolUsuario', [RolUsuarioController::class, 'destroy']);

// Rutas para la asignación de permisos a los roles
Route::post('rolePermission', [RolePermissionController::class, 'store']);
Route::delete('rolePermission', [RolePermissionController::class, 'destroy']);

// Rutas para los clientes
Route::get('/clientes', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::get('/clientes/{id}', [ClienteController::class, 'show']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{cliente}', [ClienteController::class, 'destroy']);

// Rutas para las personas
// En routes/api.php
Route::get('/personas', [PersonaController::class, 'index']);
Route::post('/personas/create', [PersonaController::class, 'store']);
Route::get('/personas/{persona}', [PersonaController::class, 'show']);
Route::put('/personas/{persona}', [PersonaController::class, 'update']);
Route::delete('/personas/{persona}', [PersonaController::class, 'destroy']);

// Rutas para los productos
Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);


// Rutas para los tipos de productos
Route::get('/tipo_productos', [TipoProductoController::class, 'index']);
Route::post('/tipo_productos', [TipoProductoController::class, 'store']);
Route::get('/tipo_productos/{id}', [TipoProductoController::class, 'show']);
Route::put('/tipo_productos/{id}', [TipoProductoController::class, 'update']);
Route::delete('/tipo_productos/{tipoProducto}', [TipoProductoController::class, 'destroy']);

// Rutas para los proveedores
Route::get('/proveedores', [ProveedorController::class, 'index']);
Route::post('/proveedores', [ProveedorController::class, 'store']);
Route::get('/proveedores/{id}', [ProveedorController::class, 'show']);
Route::put('/proveedores/{id}', [ProveedorController::class, 'update']);

// Rutas para las compras
Route::get('/compras', [CompraController::class, 'index']);
Route::post('/compras', [CompraController::class, 'store']);
Route::get('/compras/{compra}', [CompraController::class, 'show']);
Route::put('/compras/{compra}', [CompraController::class, 'update']);
Route::delete('/compras/{compra}', [CompraController::class, 'destroy']);

// Rutas para el inventario
Route::get('/inventarios', [InventarioController::class, 'index']);
Route::post('/inventarios', [InventarioController::class, 'store']);
Route::get('/inventarios/{inventario}', [InventarioController::class, 'show']);
Route::put('/inventarios/{inventario}', [InventarioController::class, 'update']);
Route::delete('/inventarios/{inventario}', [InventarioController::class, 'destroy']);

// Rutas para los servicios
Route::get('/servicios', [ServicioController::class, 'index']);
Route::post('/servicios', [ServicioController::class, 'store']);
Route::get('/servicios/{servicio}', [ServicioController::class, 'show']);
Route::put('/servicios/{servicio}', [ServicioController::class, 'update']);
Route::delete('/servicios/{servicio}', [ServicioController::class, 'destroy']);

// Rutas para los tipos de servicios
Route::get('/tipo_servicios', [TipoServicioController::class, 'index']);
Route::post('/tipo_servicios', [TipoServicioController::class, 'store']);
Route::get('/tipo_servicios/{tipoServicio}', [TipoServicioController::class, 'show']);
Route::put('/tipo_servicios/{tipoServicio}', [TipoServicioController::class, 'update']);
Route::delete('/tipo_servicios/{tipoServicio}', [TipoServicioController::class, 'destroy']);

// Rutas para las ventas
Route::get('/ventas', [VentaController::class, 'index']);
Route::post('/ventas', [VentaController::class, 'store']);
Route::get('/ventas/{venta}', [VentaController::class, 'show']);
Route::put('/ventas/{venta}', [VentaController::class, 'update']);
Route::delete('/ventas/{venta}', [VentaController::class, 'destroy']);

// Rutas para los detalles de venta
Route::get('/detalleventas', [DetalleVentaController::class, 'index']);
Route::post('/detalleventas', [DetalleVentaController::class, 'store']);
Route::get('/detalleventas/{detalleVenta}', [DetalleVentaController::class, 'show']);
Route::put('/detalleventas/{detalleVenta}', [DetalleVentaController::class, 'update']);
Route::delete('/detalleventas/{detalleVenta}', [DetalleVentaController::class, 'destroy']);
