<?php

namespace App\Http\Controllers\Client;

use App\Models\Product;
use Illuminate\Http\Request;  
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderByDesc('id')->get();
        $products->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
        $top10 = Product::orderByDesc('sale_count')->get();
        return response()->json([
            'success' => true,
            'message' => 'List thành công!',
            'products' => $products,
            'top10' => $top10,
        ], 201);
    }

    public function show(Product $product)
    {
        $product->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
        return response()->json($product);
    }

    // Lọc sản phẩm
    public function filterProducts(Request $request)
    {
        try {
            // Start the query on the Product model
            $query = Product::with(['productVariants', 'category']); // Eager load relationships
    
            // Lọc theo category (Category filter)
            if ($request->has('category')) {
                $query->where('category_id', $request->category);
            }
    
            // Lọc theo khoảng giá (Price range filter)
            if ($request->has('price_min') && $request->has('price_max')) {
                $query->whereBetween('price', [$request->price_min, $request->price_max]);
            }
    
            // Lọc theo size (Size filter)
            if ($request->has('size')) {
                $query->whereHas('productVariants', function ($q) use ($request) {
                    $q->where('size_id', $request->size); // Assuming 'size_id' is the correct field in the product_variants table
                });
            }
    
            // Lọc theo color (Color filter)
            if ($request->has('color')) {
                $query->whereHas('productVariants', function ($q) use ($request) {
                    $q->where('color_id', $request->color); // Assuming 'color_id' is the correct field in the product_variants table
                });
            }
    
            // Execute the query and get the filtered products
            $products = $query->get();
    
            // If no products are found, return a 404 response with a message
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No products found for the given filters.'
                ], 404);
            }
    
            // Return the filtered products
            return response()->json($products);
    
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'message' => 'An error occurred while filtering products.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Tìm kiếm sản phẩm theo từ khóa
    public function search(Request $request)
{
    // Lấy từ khóa tìm kiếm từ request
    $query = $request->input('keyword');  // Use input() for better practice

    // Thực hiện tìm kiếm trong cơ sở dữ liệu
    $products = Product::where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('short_description', 'like', "%{$query}%")
            ->get();

    // Kiểm tra nếu không có sản phẩm nào
    if ($products->isEmpty()) {
        return response()->json(['message' => 'No products found'], 404);
    }

    // Trả về danh sách sản phẩm tìm được
    return response()->json([
        'success' => true,
        'message' => 'Search successful!',
        'products' => $products
    ], 200);
}

}
