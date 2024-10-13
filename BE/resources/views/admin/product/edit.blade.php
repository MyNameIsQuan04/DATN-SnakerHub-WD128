<!DOCTYPE html>
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
</html>