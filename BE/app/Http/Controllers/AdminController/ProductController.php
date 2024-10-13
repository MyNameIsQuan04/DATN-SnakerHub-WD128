<?php

namespace App\Http\Controllers\AdminController;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product_Variant;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderByDesc('id')->get();
        $products->load(['category', 'productVariants.size', 'productVariants.color']);
        // return view('admin.product.index', compact('products'));
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all()->pluck('name', 'id');
        $sizes = Size::all()->pluck('name', 'id');
        $colors = Color::all()->pluck('name', 'id');


        // dd($categories, $sizes, $colors);

        // return response()->json([
        //     'categories' => $categories,
        //     'sizes' => $sizes,
        //     'colors' => $colors,
        // ]);

        return view('admin.product.create', compact('categories', 'sizes', 'colors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // dd($request->all());

        try {
            $dataProduct = [
                'category_id' => $request->category_id,
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
            ];

            $product = Product::query()->create($dataProduct);
            // dd($request->variants);
            foreach ($request->variants as $key => $variant) {
                // dd($variant);

                $dataProductVariant = [
                    'sku' => $variant['sku'],
                    'size_id' => $variant['size'],
                    'color_id' => $variant['color'],
                    'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                    'stock' => $variant['stock'],
                ];

                if (isset($variant['thumbnail']) && $request->file('variants.' . $key . '.thumbnail')) {
                    $thumbnailPath = $request->file('variants.' . $key . '.thumbnail')->store('images', 'public');
                    $dataProductVariant['thumbnail'] = Storage::url($thumbnailPath);
                }

                $imageUrls = [];
                if ($request->file('variants.' . $key . '.images')) {
                    foreach ($request->file('variants.' . $key . '.images') as $image) {
                        $imagePath = $image->store('images', 'public');
                        $imageUrls[] = Storage::url($imagePath);
                    }
                }

                $dataProductVariant['images'] = json_encode($imageUrls);

                $product->productVariants()->create($dataProductVariant);
            }
            // $product->load('productVariants');

            return response()->json($product);
            // return redirect()->route('products.index')->with('success', 'Them moi thanh cong');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::where('id', $id)->first();
        $product->load(['category', 'productVariants']);
        // return view('admin.product.index', compact('products'));

        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product->load(['category', 'productVariants']);
        $categories = Category::query()->pluck('name', 'id')->all();
        $sizes = Size::all()->pluck('name', 'id');
        $colors = Color::all()->pluck('name', 'id');

        return view('admin.product.edit', compact('product', 'categories', 'sizes', 'colors'));
        // return response()->json([
        //     'product' => $product,
        //     'categories' => $categories,
        //     'sizes' => $sizes,
        //     'colors' => $colors,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // dd($request->variants);

        try {
            $dataProduct = [
                'category_id' => $request->category_id,
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
            ];

            $product->update($dataProduct);

            foreach ($request->variants as $key => $variant) {
                if (isset($variant['id'])) {
                    $variantEdit = $product->productVariants()->where('id', $variant['id'])->first();
                    // dd($variant['id']);
                    if ($variantEdit) {
                        $dataProductVariant = [
                            'sku' => $variant['sku'],
                            'size_id' => $variant['size'],
                            'color_id' => $variant['color'],
                            'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                            'stock' => $variant['stock'],
                        ];

                        if ($request->hasFile('variants.' . $key . '.thumbnail')) {
                            $thumbnailPath = $request->file('variants.' . $key . '.thumbnail')->store('images', 'public');
                            $dataProductVariant['thumbnail'] = Storage::url($thumbnailPath);
                        }

                        $imageUrls = [];
                        if ($request->hasFile('variants.' . $key . '.images')) {
                            foreach ($request->file('variants.' . $key . '.images') as $image) {
                                $imagePath = $image->store('images', 'public');
                                $imageUrls[] = Storage::url($imagePath);
                            }
                        }
                        $dataProductVariant['images'] = json_encode($imageUrls);

                        $variantEdit->update($dataProductVariant);
                    }
                } else {
                    $dataProductVariant = [
                        'sku' => $variant['sku'],
                        'size_id' => $variant['size'],
                        'color_id' => $variant['color'],
                        'price' => isset($variant['price']) ? $variant['price'] : $product->price,
                        'stock' => $variant['stock'],
                    ];

                    if ($request->hasFile('variants.' . $key . '.thumbnail')) {
                        $thumbnailPath = $request->file('variants.' . $key . '.thumbnail')->store('images', 'public');
                        $dataProductVariant['thumbnail'] = Storage::url($thumbnailPath);
                    }

                    $imageUrls = [];
                    if ($request->hasFile('variants.' . $key . '.images')) {
                        foreach ($request->file('variants.' . $key . '.images') as $image) {
                            $imagePath = $image->store('images', 'public');
                            $imageUrls[] = Storage::url($imagePath);
                        }
                    }
                    $dataProductVariant['images'] = json_encode($imageUrls);

                    $product->productVariants()->create($dataProductVariant);
                }
            }

            // return redirect()->route('products.index')->with('success', 'Cập nhật thành công');
            
            $product->load(['productVariants.size', 'productVariants.color']);
            return response()->json($product);
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
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


            return response()->json($product);
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }
}
