<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function showRegisterForm(){
        return view('auth.register');
    }
    public function register(Request $request){
        // dd("ok");
        $request->validate([
            'name' =>'required|string|max:255',
            'email' =>'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' =>'required|string|max:20',
            'address' =>'required|string',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'type' => 'admin',  
        ]);
        return $user;
    }
    public function showLoginForm(){
        return view('auth.login');
    }
    public function login(Request $request){
    //  $user=   $request->validate([
    //         'email' =>'required|string|email|max:255',
    //         'password' => 'required|string',
    //     ]);
    //     if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
    //         return $user; 
    //     }
    //     return redirect()->back()->with('error', 'Invalid email or password');
    $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->type == 'admin') {
                return $user;
            } else {
                return $user;
            }
        }

        return back();
    }
    public function logout(){
        Auth::logout();
        return redirect()->route('login')->with('success', 'Logout successfully');
    }
}
