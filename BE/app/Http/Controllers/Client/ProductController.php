<?php

namespace App\Http\Controllers\Client;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Category;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderByDesc('id')->get()
            ->load('category', 'productVariants.size', 'productVariants.color', 'galleries');

        $top10 = Product::orderByDesc('sell_count')->get()
            ->load('category', 'productVariants.size', 'productVariants.color', 'galleries');

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

        $rates = Comment::where('product_id', $product['id'])->get()
            ->load('user', 'product.productVariants.size', 'product.productVariants.color');

        $countRates = Comment::where('product_id', $product['id'])->count();

        $countSell = Product::where('id', $product['id'])->value('sell_count');

        $averageRates = $rates->average('star');

        return response()->json([
            'success' => true,
            'message' => 'thành công!',
            'product' => $product,
            'rates' => $rates,
            'countRates' => $countRates,
            'countSell' => $countSell,
            'averageRates' => $averageRates,
        ], 201);
    }

    // Lọc sản phẩm
    public function filterProducts(Request $request)
    {
        try {
            // Start the query on the Product model
            $query = Product::query(); // Eager load relationships

            // // Lọc theo category (Category filter)
            if ($request->has('category')) {
                $query->where('category_id', $request->category);
            }

            // // Lọc theo khoảng giá (Price range filter)
            if ($request->has('price_min') && $request->has('price_max')) {
                $query->whereBetween('price', [$request->price_min, $request->price_max]);
            }

            // // Lọc theo size (Size filter)
            if ($request->has('size')) {
                $query->whereHas('productVariants', function ($q) use ($request) {
                    $q->where('size_id', $request->size); // Assuming 'size_id' is the correct field in the product_variants table
                });
            }

            // // Lọc theo color (Color filter)
            if ($request->has('color')) {
                $query->whereHas('productVariants', function ($q) use ($request) {
                    $q->where('color_id', $request->color); // Assuming 'color_id' is the correct field in the product_variants table
                });
            }
            // dd($query->toSql());
            // // Execute the query and get the filtered products
            $products = $query->get();
            $products->load('category');

            // // If no products are found, return a 404 response with a message
            if ($products->isEmpty()) {
                return response()->json([
                    'message' => 'No products found for the given filters.'
                ], 404);
            }

            // Return the filtered products
            return response()->json($products, 200);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'message' => 'An error occurred while filtering products.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function filterByCategory($id)
    {
        // Kiểm tra danh mục tồn tại
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        // Lọc sản phẩm theo category
        $products = Product::where('category_id', $id)->get();
        $products->load('category');

        // Trả về danh sách sản phẩm
        return response()->json([
            'status' => 'success',
            'category' => $category->name,
            'products' => $products
        ], 200);
    }
    public function search(Request $request)
    {
        try {
            // Lấy từ khóa tìm kiếm từ request
            $query = $request['keyword']; // Use input() for better practice

            // Thực hiện tìm kiếm trong cơ sở dữ liệu
            $products = Product::where('name', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->orWhere('short_description', 'like', "%{$query}%")
                ->get();
            $products->load('category');
            return response()->json([
                'success' => true,
                'message' => 'Search successful!',
                'products' => $products
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }
}
