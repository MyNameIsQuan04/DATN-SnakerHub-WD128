<?php

namespace App\Http\Controllers\api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Gallery;
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
        $products->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
        return $products;
    }

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

            foreach ($validatedData['galleries'] ?? [] as $image) {
                $image_path = Storage::url($image->store('images', 'public'));
                $product->galleries()->create([
                    'image_path' => $image_path,
                ]);
            }

            foreach ($validatedData['variants'] as $variant) {

                $dataVariant = [
                    'color_id' => $variant['color_id'],
                    'size_id' => $variant['size_id'],
                    'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                    'stock' => $variant['stock'],
                    'sku' => $variant['sku'],
                ];

                if (isset($variant['image'])) {
                    $dataVariant['image'] = Storage::url($variant['image']->store('images', 'public'));
                }

                $product->productVariants()->create($dataVariant);
            }
            $product->load('category', 'productVariants.size', 'productVariants.color', 'galleries');

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

    public function show(Product $product)
    {
        $product->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
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

            foreach ($validatedData['galleries'] ?? [] as $gallery) {
                if (isset($gallery['id'])) {
                    $gallery = $product->galleries()->where('id', $gallery['id'])->first();
                    $gallery->update([
                        'image_path' => Storage::url($gallery['image']->store('images', 'public')),
                    ]);
                } else {
                    $image_path = Storage::url($gallery['image']->store('images', 'public'));
                    $product->galleries()->create([
                        'image_path' => $image_path,
                    ]);
                }
            }

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

                        if (isset($variant['image']) && ($request->hasFile($variant['image']))) {
                            $dataVariant['image'] = Storage::url($variant['image']->store('images', 'public'));
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
    
                    if (isset($variant['image'])) {
                        $dataVariant['image'] = Storage::url($variant['image']->store('images', 'public'));
                    }
    
                    $product->productVariants()->create($dataVariant);
                }
            }

            $product->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
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

                $product->load('productVariants.cartItems', 'comments', 'galleries');

                foreach ($product->productVariants as $productVariant) {
                    $productVariant->cartItems()->delete();
                }
                $product->galleries()->delete();
                
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
