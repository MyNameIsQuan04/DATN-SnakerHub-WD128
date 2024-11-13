<?php

namespace App\Http\Controllers\Client;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Models\Comment;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderByDesc('id')->get()
            ->load('category', 'productVariants.size', 'productVariants.color', 'galleries');

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

        $rates = Comment::where('product_id',$product['id'])->get()
            ->load('user','product');

        $averageRates = $rates->average('star');

        return response()->json([
            'success' => true,
            'message' => 'thành công!',
            'product' => $product,
            'rates' => $rates,
            'averageRates' => $averageRates,
        ], 201);
    }
}
