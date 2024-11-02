<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')

    <div>
        <label for="category_id">Category</label>
        <select name="category_id" id="category_id" required>
            @foreach ($categories as $key => $cate)
                <option value="{{ $key }}" {{ $product->category_id == $key ? 'selected' : '' }}>{{ $cate }}</option>
            @endforeach
        </select>
    </div>

    <div>
        <label for="name">Product Name</label>
        <input type="text" name="name" id="name" value="{{ $product->name }}" required>
    </div>

    <div>
        <label for="description">Description</label>
        <textarea name="description" id="description" required>{{ $product->description }}</textarea>
    </div>

    <div>
        <label for="price">Price</label>
        <input type="number" name="price" id="price" value="{{ $product->price }}" required>
    </div>

    <div id="variants">
        @foreach($product->productVariants as $key => $variant)
            <div class="variant">
                <h4>Variant {{ $key + 1 }}</h4>
                <div>
                    <input type="text" name="variants[{{ $key }}][id]" hidden value="{{$variant->id}}">
                </div>
                <div>
                    <label for="sku">Mã</label>
                    <input type="text" name="variants[{{ $key }}][sku]" value="{{ $variant->sku }}" required>
                </div>
                <div>
                    <label for="size">Size</label>
                    <select name="variants[{{ $key }}][size]" required>
                        @foreach($sizes as $sizeId => $sizeName)
                            <option value="{{ $sizeId }}" {{ $variant->size_id == $sizeId ? 'selected' : '' }}>{{ $sizeName }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label for="color">Color</label>
                    <select name="variants[{{ $key }}][color]" required>
                        @foreach($colors as $colorId => $colorName)
                            <option value="{{ $colorId }}" {{ $variant->color_id == $colorId ? 'selected' : '' }}>{{ $colorName }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label for="price">Price</label>
                    <input type="number" name="variants[{{ $key }}][price]" value="{{ $variant->price }}">
                </div>
                <div>
                    <label for="stock">Stock</label>
                    <input type="number" name="variants[{{ $key }}][stock]" value="{{ $variant->stock }}" required>
                </div>
                <div>
                    <label for="thumbnail">Thumbnail</label>
                    <input type="file" name="variants[{{ $key }}][thumbnail]">
                    <img src="{{ $variant->thumbnail }}" alt="Thumbnail" width="100">
                </div>
                <div>
                    <label for="images">Chọn ảnh cho biến thể (có thể chọn nhiều ảnh):</label>
                    <input type="file" name="variants[{{ $key }}][images][]" multiple>
                    @if($variant->images && is_array(json_decode($variant->images, true)))
                        @foreach(json_decode($variant->images, true) as $image)
                            <img src="{{ $image }}" alt="Image" width="100">
                        @endforeach
                    @else
                        <img src="/images/no-image.png" alt="No image available" width="100">
                    @endif
                </div>
            </div>
        @endforeach
    </div>

    <button type="submit">Cập nhật</button>
</form>
</body>
</html> -->

<div class="container">
    <h1>Edit Product</h1>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('products.update', $product->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <!-- Product Details -->
        <div class="form-group">
            <label for="category_id">Category</label>
            <select name="category_id" id="category_id" class="form-control">
                @foreach ($categories as $id => $name)
                    <option value="{{ $id }}" {{ $product->category_id == $id ? 'selected' : '' }}>{{ $name }}</option>
                @endforeach
            </select>
        </div>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $product->name }}">
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" id="description" class="form-control">{{ $product->description }}</textarea>
        </div>

        <div class="form-group">
            <label for="price">Price</label>
            <input type="number" name="price" id="price" class="form-control" value="{{ $product->price }}">
        </div>

        <!-- Thumbnail -->
        <div class="form-group">
            <label for="thumbnail">Thumbnail</label>
            <input type="file" name="thumbnail" id="thumbnail" class="form-control">
            @if ($product->thumbnail)
                <img src="{{ $product->thumbnail }}" alt="Thumbnail" style="max-width: 200px; margin-top: 10px;">
            @endif
        </div>

        <!-- Product Variants -->
        <h3>Product Variants</h3>
        @foreach ($product->productVariants as $variant)
            <div class="variant">
                <input type="hidden" name="variants[{{ $loop->index }}][id]" value="{{ $variant->id }}">

                <div class="form-group">
                    <label for="color_id_{{ $loop->index }}">Color</label>
                    <select name="variants[{{ $loop->index }}][color_id]" id="color_id_{{ $loop->index }}"
                        class="form-control">
                        @foreach ($colors as $id => $name)
                            <option value="{{ $id }}" {{ $variant->color_id == $id ? 'selected' : '' }}>{{ $name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label for="size_id_{{ $loop->index }}">Size</label>
                    <select name="variants[{{ $loop->index }}][size_id]" id="size_id_{{ $loop->index }}"
                        class="form-control">
                        @foreach ($sizes as $id => $name)
                            <option value="{{ $id }}" {{ $variant->size_id == $id ? 'selected' : '' }}>{{ $name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label for="price_{{ $loop->index }}">Price</label>
                    <input type="number" name="variants[{{ $loop->index }}][price]" id="price_{{ $loop->index }}"
                        class="form-control" value="{{ $variant->price }}">
                </div>

                <div class="form-group">
                    <label for="stock_{{ $loop->index }}">Stock</label>
                    <input type="number" name="variants[{{ $loop->index }}][stock]" id="stock_{{ $loop->index }}"
                        class="form-control" value="{{ $variant->stock }}">
                </div>

                <div class="form-group">
                    <label for="sku_{{ $loop->index }}">SKU</label>
                    <input type="text" name="variants[{{ $loop->index }}][sku]" id="sku_{{ $loop->index }}"
                        class="form-control" value="{{ $variant->sku }}">
                </div>

                <!-- Variant Image -->
                <div class="form-group">
                    <label for="image_{{ $loop->index }}">Variant Image</label>
                    <input type="file" name="variants[{{ $loop->index }}][image]" id="image_{{ $loop->index }}"
                        class="form-control">
                    @if ($variant->image)
                        <img src="{{ $variant->image }}" alt="Variant Image" style="max-width: 100px; margin-top: 10px;">
                    @endif
                </div>
            </div>
        @endforeach    
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
</div>