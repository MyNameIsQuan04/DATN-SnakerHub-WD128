<?php

namespace App\Http\Controllers\api;

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
    public function destroy(Color $color)
    {
        // Kiểm tra nếu không tìm thấy color
        if (!$color) {
            return response()->json(['message' => 'Color not found'], 404);
        }

        // Lấy color mặc định, nếu không có thì tạo mới
        $defaultColor = Color::firstOrCreate(['name' => 'Mặc định']);

        // Chuyển tất cả product_variants sang color mặc định
        $color->productVariants()->update(['color_id' => $defaultColor->id]);

        // Xóa color (hỗ trợ xóa mềm nếu có)
        $color->delete();

        return response()->json(['message' => 'Color deleted and product variants moved to default color'], 200);
    }
}
