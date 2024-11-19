<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            "name" => ['required', 'string'],
            "email" => ['required', 'string'],
            "password" => ['required', 'string']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->messages(), Response::HTTP_BAD_REQUEST);
        }
        $user = User::create([
            "name" => $request->json("name"),
            "email" => $request->json("email"),
            "image" => $request->json("image"),
            "password" => bcrypt($request->json("password"))
        ]);
        return response()->json($user);
    }

    public function login(Request $request){
        $credentials = request(['email', 'password']);
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token');
            return response()->json([
                "access_token" => $tokenResult->plainTextToken,
                //usuario sin su email
                "datosUserLogged" => $user->only(["id", "name", "image"])
            ]);
        } else {
            return response()->json([
                "message" => "Unauthenticated."
            ], 401);
        }
    }

    public function upload(Request $request){
        $file = $request->file('image');
        $name = $file->getClientOriginalName();
        $file->move(public_path().'/imagesUsers/',$name);
        return response()->json(['imagen'=>$name]);
    }

    //obtener datos del usuario que inicio sesion
    public function user(Request $request){
        $user = $request->user();
        return response()->json($user);
    }

    //obtener el usuario con sus tableros menos el que ha iniciado sesion
    public function getUsuarios(){
        $usuarios = User::with("tablero")->where("id", "<>", Auth::user()->id)->get();
        return response()->json($usuarios);
    }

    //get image
    public function getImage($filename){
        $file = public_path() . '/imagesUsers/' . $filename;
        if (file_exists($file)) {
            return Image::make($file)->response();
        }
    }

    //obtener los usuarios que pertenecen a un tablero
    public function getUsuariosTablero($id){
    //obtener los usuarios que pertenecen al tablero en base al id
        $usuarios = User::with("tablero.user")->get();
        return response()->json($usuarios);
    }
}
