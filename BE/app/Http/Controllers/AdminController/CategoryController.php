<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderByDesc('id')->get();
        // dd($categories);
        // return view('admin.category.index', compact('categories'));
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.category.create');
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
            $category = new Category([
                'name'  => $request['name']
            ]);
            $category->save();

            return redirect()->route('categories.index')->with('success', 'Thêm thành công');
            // return response()->json($category);
            
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cate = Category::where('id', $id)->first();

        return response()->json($cate);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $request->validate([
                'name-category' => 'required|string|max:255'
            ]);
            $category->name  = $request['name-category'];
            $category->save();

            // return redirect()->route('categories.index')->with('success', 'Cập nhật thành công');
            return response()->json($category);

        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

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
        
        return response()->json($category);
        // return redirect()->route('categories.index')->with('success', 'Xóa thành công');
    }
}