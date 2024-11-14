<?php

namespace App\Http\Controllers\AdminController;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function create()
    {
        // Fetch necessary data for form (categories, sizes, colors)
        $categories = Category::query()->pluck('name', 'id')->all();
        $sizes = Size::all()->pluck('name', 'id');
        $colors = Color::all()->pluck('name', 'id');

        // Return view with product and related data
        return view('admin.product.create', [
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
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

    public function edit(Product $product)
    {
        // Load relationships
        $product->load('productVariants.size', 'productVariants.color', 'galleries');

        // Fetch necessary data for form (categories, sizes, colors)
        $categories = Category::query()->pluck('name', 'id')->all();
        $sizes = Size::all()->pluck('name', 'id');
        $colors = Color::all()->pluck('name', 'id');

        // Return view with product and related data
        return view('admin.product.edit', [
            'product' => $product,
            'categories' => $categories,
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
    }

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
                $thumbnailPath = Storage::put('images', $validatedData['thumbnail']);
                $dataProduct['thumbnail'] = Storage::url($thumbnailPath);
            }
            $product->update($dataProduct);

            foreach ($validatedData['galleries'] ?? [] as $gallery) {
                if (isset($gallery['id'])) {
                    $gallery = $product->galleries()->where('id', $gallery['id'])->first();
                    $gallery->update([
                        'image_path' => Storage::url(Storage::put('images', $gallery['image'])),
                    ]);
                } else {
                    $image_path = Storage::url(Storage::put('images', $gallery['image']));
                    $product->galleries()->create([
                        'image_path' => $image_path,
                    ]);
                }
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
                    $dataVariant['image'] = Storage::url(Storage::put('images', $variant['image']));
                }
                $product->productVariants()->update($dataVariant);
            }
            $product->load('category', 'productVariants.size', 'productVariants.color', 'galleries');
            $categories = Category::query()->pluck('name', 'id')->all();
            $sizes = Size::all()->pluck('name', 'id');
            $colors = Color::all()->pluck('name', 'id');

            return response()->json([
                'success' => true,
                'message' => 'cập nhật thành công!',
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
}
