<?php

namespace App\Http\Controllers\api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withTrashed()->orderByDesc('id')->get();
        // dd($categories);
        // return view('admin.category.index', compact('categories'));
        // return response()->json($categories);
        return $categories;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:categories,name'
            ]);
            return Category::create($request->all());
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    try {
        $category = Category::withTrashed()->findOrFail($id);
        return response()->json($category, 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Category not found','error' => $e,], 404);
    }
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // return $category->update($request->all());
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:categories,name'
            ]);
            $category->update($request->all());
            return $category;
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->load('products.productVariants.cartItems', 'products.comments');

        foreach ($category->products as $product) {
            foreach ($product->productVariants as $productVariant) {
                $productVariant->cartItems()->delete();
            }

            $product->productVariants()->delete();
            $product->comments()->delete();
        }

        $category->products()->delete();

        $category->delete();

        return $category;
    }
}
