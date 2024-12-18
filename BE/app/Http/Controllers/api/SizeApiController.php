<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;
class SizeApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::all();
        return response()->json($sizes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:10',
        ]);

        $size = Size::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Size created successfully', 'size' => $size], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        return response()->json($size);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:10',
        ]);

        $size->update([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Size updated successfully', 'size' => $size]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Size $size)
{
    // Kiểm tra nếu không tìm thấy size
    if (!$size) {
        return response()->json(['message' => 'Size not found'], 404);
    }

    // Lấy size mặc định, nếu không có thì tạo mới
    $defaultSize = Size::firstOrCreate(['name' => 'Mặc định']);

    // Chuyển tất cả product_variants sang size mặc định
    $size->productVariants()->update(['size_id' => $defaultSize->id]);

    // Xóa size (hỗ trợ xóa mềm nếu có)
    $size->delete();

    return response()->json(['message' => 'Size deleted and product variants moved to default size'], 200);
}

    
}
