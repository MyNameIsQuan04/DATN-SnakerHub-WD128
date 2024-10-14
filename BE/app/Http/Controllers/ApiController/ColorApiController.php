<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Color;
class ColorApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colors = Color::all();
        return response()->json($colors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $color = Color::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Color created successfully', 'color' => $color], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        return response()->json($color);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $color->update([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Color updated successfully', 'color' => $color]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $color = Color::find($id);

        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        // Xóa tất cả các product_variants liên quan đến màu này
        $color->productVariants()->delete();
        $color->delete();

        return response()->json(['message' => 'Color deleted successfully']);
    }
}
