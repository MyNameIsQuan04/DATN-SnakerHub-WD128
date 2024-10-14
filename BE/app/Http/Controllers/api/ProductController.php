<?php

namespace App\Http\Controllers\api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product_Variant;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderByDesc('id')->get();
        $products->load(['category', 'productVariants.size', 'productVariants.color']);
        return $products;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $dataProduct = [
                'category_id' => $validatedData['category_id'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
            ];
            if (isset($validatedData['thumbnail'])) {
                $thumbnailPath = $validatedData['thumbnail']->store('images', 'public');
                $dataProduct['thumbnail'] = Storage::url($thumbnailPath);
            }

            $product = Product::create($dataProduct);

            foreach ($validatedData['variants'] as $variant) {

                $dataVariant = [
                    'color_id' => $variant['color_id'],
                    'size_id' => $variant['size_id'],
                    'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                    'stock' => $variant['stock'],
                    'sku' => $variant['sku'],
                ];

                $imagePaths = [];
                if (isset($variant['images'])) {
                    foreach ($variant['images'] as $image) {
                        $path = $image->store('public/images');
                        $imagePaths[] = Storage::url($path);
                    }
                    $dataVariant['images'] = json_encode($imagePaths);
                }
                $product->productVariants()->create($dataVariant);
                // Product_Variant::create($dataVariant);
            }
            $product->load('category', 'productVariants.size', 'productVariants.color');

            $categories = Category::query()->pluck('name', 'id')->all();
            $sizes = Size::all()->pluck('name', 'id');
            $colors = Color::all()->pluck('name', 'id');

            return response()->json([
                'success' => true,
                'message' => 'Sản phẩm và các biến thể đã được tạo thành công!',
                'product' => $product,
                'categories' => $categories,
                'sizes' => $sizes,
                'colors' => $colors,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'productVariants.size', 'productVariants.color']);
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $validatedData = $request->validated();
            $dataProduct = [
                'category_id' => $validatedData['category_id'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
            ];
            if (isset($validatedData['thumbnail'])) {
                $thumbnailPath = $validatedData['thumbnail']->store('images', 'public');
                $dataProduct['thumbnail'] = Storage::url($thumbnailPath);
            }

            $product->update($dataProduct);

            foreach ($validatedData['variants'] as $variant) {
                if (isset($variant['id'])) {
                    $productVariant = $product->productVariants()->where('id', $variant['id'])->first();
                    if ($productVariant) {

                        $dataVariant = [
                            'color_id' => $variant['color_id'],
                            'size_id' => $variant['size_id'],
                            'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                            'stock' => $variant['stock'],
                            'sku' => $variant['sku'],
                        ];


                        $imagePaths = [];
                        if (isset($variant['images'])&&($request->hasFile($variant['images']))) {
                            foreach ($variant['images'] as $image) {
                                $path = $image->store('public/images');
                                $imagePaths[] = Storage::url($path);
                            }
                            $dataVariant['images'] = json_encode($imagePaths);
                        }

                        $productVariant->update($dataVariant);
                    }
                } else {
                    $dataVariant = [
                        'color_id' => $variant['color_id'],
                        'size_id' => $variant['size_id'],
                        'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                        'stock' => $variant['stock'],
                        'sku' => $variant['sku'],
                    ];

                    $imagePaths = [];
                    if (isset($variant['images'])&&($request->hasFile($variant['images']))) {
                        foreach ($variant['images'] as $image) {
                            $path = $image->store('public/images');
                            $imagePaths[] = Storage::url($path);
                        }
                        $dataVariant['images'] = json_encode($imagePaths);
                    }
                    $product->productVariants()->create($dataVariant);
                }
            }

            $product->load('category', 'productVariants.size', 'productVariants.color');
            $categories = Category::query()->pluck('name', 'id')->all();
            $sizes = Size::all()->pluck('name', 'id');
            $colors = Color::all()->pluck('name', 'id');

            return response()->json([
                'success' => true,
                'message' => 'Sản phẩm và các biến thể đã được tạo thành công!',
                'product' => $product,
                'categories' => $categories,
                'sizes' => $sizes,
                'colors' => $colors,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            DB::transaction(function () use ($product) {

                $product->load('productVariants.cartItems', 'comments');

                foreach ($product->productVariants as $productVariant) {
                    $productVariant->cartItems()->delete();
                }

                $product->productVariants()->delete();

                $product->comments()->delete();

                $product->delete();
            });

            return $product;
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }
}
