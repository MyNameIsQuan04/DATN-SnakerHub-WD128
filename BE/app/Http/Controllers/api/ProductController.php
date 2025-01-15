<?php

namespace App\Http\Controllers\api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Gallery;
use App\Models\Product;
use App\Models\Category;
use App\Models\Product_Variant;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\HistoryService;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'productVariants', 'galleries',])->orderByDesc('id')->get();
        return $products;
    }


    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validated();

            $dataProduct = [
                'category_id' => $validatedData['category_id'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'short_description' => $validatedData['short_description'],
                'price' => $validatedData['price'],
            ];

            if (isset($validatedData['thumbnail'])) {
                $thumbnailPath = $validatedData['thumbnail']->store('images', 'public');
                $dataProduct['thumbnail'] = Storage::url($thumbnailPath);
            }

            $product = Product::create($dataProduct);

            HistoryService::log('products', $product->id, 'create', [], $dataProduct);

            foreach ($validatedData['galleries'] ?? [] as $image) {
                $image_path = Storage::url($image->store('images', 'public'));
                $gallery = $product->galleries()->create([
                    'image_path' => $image_path,
                ]);

                HistoryService::log('product_galleries', $gallery->id, 'create', [], $gallery);
            }

            foreach ($validatedData['variants'] as $variant) {
                $maSKU = "SKU-" . $product->id . '-' . $variant['color_id'] . '-' . $variant['size_id'];

                $exists = Product_Variant::where('sku', $maSKU)->exists();
                if ($exists) {
                    throw new \Exception('Đã tồn tại biến thể hoặc có thêm biến thể trùng lặp');
                }

                $dataVariant = [
                    'color' => Color::where('id', $variant['color_id'])->value('name'),
                    'size' => Size::where('id', $variant['size_id'])->value('name'),
                    'entry_price' => $variant['entry_price'],
                    'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                    'stock' => $variant['stock'],
                    'sku' => $maSKU,
                ];

                if (isset($variant['image'])) {
                    $dataVariant['image'] = Storage::url($variant['image']->store('images', 'public'));
                }

                $product_variant = $product->productVariants()->create($dataVariant);

                HistoryService::log('product_variants', $product_variant->id, 'create', [], $product_variant);
            }

            $product->load('category', 'productVariants', 'galleries');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Sản phẩm và các biến thể đã được tạo thành công!',
                'product' => $product,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction khi có lỗi

            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        $product = Product::withTrashed()->findOrFail($id);

        $product->load('category', 'productVariants', 'galleries');

        // Thêm trạng thái đã xóa
        $product->is_deleted = $product->trashed();

        return $product;
    }


    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::beginTransaction();
        try {
            $validatedData = $request->validated();

            $dataProduct = [
                'category_id' => $validatedData['category_id'],
                'name' => $validatedData['name'],
                'description' => $validatedData['description'],
                'short_description' => $validatedData['short_description'],
                'price' => $validatedData['price'],
            ];

            if (isset($validatedData['thumbnail'])) {
                $thumbnailPath = $validatedData['thumbnail']->store('images', 'public');
                $dataProduct['thumbnail'] = Storage::url($thumbnailPath);
            }
            $oldDataProduct = $product;
            $product->update($dataProduct);
            HistoryService::log('products', $product->id, 'update', $oldDataProduct, $product);

            foreach ($validatedData['galleries'] ?? [] as $gallery) {
                if (isset($gallery['id'])) {
                    $existingGallery = $product->galleries()->where('id', $gallery['id'])->first();
                    $oldDataGallery = $existingGallery;
                    if ($existingGallery) {
                        $imagePath = $gallery['image']->store('images', 'public');
                        $existingGallery->update([
                            'image_path' => Storage::url($imagePath),
                        ]);
                        HistoryService::log('product_galleries', $existingGallery->id, 'update', $oldDataGallery, $existingGallery);
                    }
                } else {
                    $imagePath = $gallery['image']->store('images', 'public');
                    $gallery = $product->galleries()->create([
                        'image_path' => Storage::url($imagePath),
                    ]);

                    HistoryService::log('product_galleries', $gallery->id, 'create', [], $gallery);
                }
            }

            $variantIds = [];
            foreach ($validatedData['variants'] as $variant) {
                $maSKU = "SKU-" . $product->id . '-' . $variant['color_id'] . '-' . $variant['size_id'];

                $dataVariant = [
                    'color' => Color::where('id', $variant['color_id'])->value('name'),
                    'size' => Size::where('id', $variant['size_id'])->value('name'),
                    'stock' => $variant['stock'],
                    'sku' => $maSKU,
                    'entry_price' => $variant['entry_price'],
                ];

                if (isset($variant['price'])) {
                    $dataVariant['price'] = $variant['price'];
                };

                if (isset($variant['id'])) {
                    $existingVariant = $product->productVariants()->where('id', $variant['id'])->first();
                    $oldDataVariant = $existingVariant;
                    if ($existingVariant) {
                        if (isset($variant['image'])) {
                            $variantImagePath = $variant['image']->store('images', 'public');
                            $dataVariant['image'] = Storage::url($variantImagePath);
                        } else {
                            $dataVariant['image'] = $existingVariant['image'];
                        }
                        $existingVariant->update($dataVariant);
                        $variantIds[] = $existingVariant->id;
                        HistoryService::log('product_variants', $existingVariant->id, 'update', $oldDataVariant, $existingVariant);
                    }
                } else {
                    if (isset($variant['image'])) {
                        $variantImagePath = $variant['image']->store('images', 'public');
                        $dataVariant['image'] = Storage::url($variantImagePath);
                    }
                    $exists = Product_Variant::where('sku', $maSKU)->exists();

                    if ($exists) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Đã tồn tại biến thể',
                        ], 404);
                    }
                    $newVariant = $product->productVariants()->create($dataVariant);
                    HistoryService::log('product_variants', $newVariant->id, 'create', [], $newVariant);
                    $variantIds[] = $newVariant->id;
                }
            }

            HistoryService::log('product_variants', $product->id, 'delete', $product->productVariants()->whereNotIn('id', $variantIds)->get(), []);
            $product->productVariants()->whereNotIn('id', $variantIds)->delete();


            $product->load('category', 'productVariants', 'galleries');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công!',
                'product' => $product,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Product $product)
    {
        try {
            DB::transaction(function () use ($product) {

                $product->load('productVariants.cartItems', 'comments', 'galleries');

                HistoryService::log('products', $product->id, 'delete', $product, []);

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
