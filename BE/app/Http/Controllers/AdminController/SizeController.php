<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;
class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $sizes = Size::all();
       return view('admin.size.index',compact('sizes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.size.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string','max:255'],
        ]);
        Size::create($request->all());
        return redirect()->route('admin.size.index')->with('success');
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
       $size = Size::finfOrFail($id); 
       return view('admin.size.edit',compact('size'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $request->validate([
        'name' => ['required','string','max:255'],
       ]);
       $size = Size::findOrFail($id);
       $size->update($request->all());
       return redirect()->route('admin.size.index')->with('success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $size = Size::findOrFail($id);
        $size->delete();
        return redirect()->route('admin.size.index')->with('success');
    }
}
