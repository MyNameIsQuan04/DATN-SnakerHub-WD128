<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;
class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::all();
        return view('admin.color.index', compact('colors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.color.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string','max:255'],
            
        ]);
        Color::create($request->all());
        return redirect()->route('admin.color.index')->with('success', 'Màu đã được thêm thành công');
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
       $color = Color::findOrFail($id);
       return view('admin.color.edit', compact('color'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required','string','max:255'],
        ]);
        $color = Color::findOrFail($id);
        $color->update($request->all());
        return redirect()->route('admin.color.index')->with('success', 'Màu đã được cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Color $color)
    {
        $productVariants=$color->productVariants;
        foreach($productVariants as $variant){
            $variant->cartItems()->delete();
            $variant->delete();
        }
        $color->delete();
        return redirect()->route('admin.color.index')->with('success', 'Màu đã được xóa thành công');
    }
}