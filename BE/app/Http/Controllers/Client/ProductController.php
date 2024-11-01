<?php

namespace App\Http\Controllers\Client;

use App\Models\Product;
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
        return $product;
    }
}
