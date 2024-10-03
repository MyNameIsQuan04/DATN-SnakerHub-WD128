<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $uses = User::all();
        return view('admin.user.index', compact('uses'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.user.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string','max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string','min:8', 'confirmed'],
            'type' => ['required', 'in:admin,user'],
            'phone_number' =>['required', 'string', 'max:15'],
            'address' => ['required', 'string','max:255'],
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' =>  Hash::make($request->password),
            'type' => $request->type,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'remember_token'=>str::random(10),
        ]);
        return redirect()->route('admin.user.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       $user = User::findOrFail($id);
       return view('admin.user.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string','max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string','min:8', 'confirmed'],
            'type' => ['required', 'in:admin,user'],
            'phone_number' =>['required', 'string', 'max:15'],
            'address' => ['required', 'string','max:255'],
        ]);
        $user = User::findOrFail($id);
        $user->update($request->only('name','email','password','type','phone_number','address'));
        return redirect()->route('admin.user.index')->with('success', 'User updated successfully'); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.user.index')->with('success', 'User deleted successfully');
    }
    public function login(){
        return view('admin.user.login');
    }
    public function forgotPassword(){
        return view('admin.user.forgot_password');
    }
}
