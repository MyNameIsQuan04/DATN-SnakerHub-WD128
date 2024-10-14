@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif


<form action="{{ route('products.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div>
        <label for="category_id">Category</label>
        <select name="category_id" id="category_id" required>
            @foreach ($categories as $key => $cate)
                <option value="{{$key}}">{{$cate}}</option>
            @endforeach
        </select>
    </div>

    <div>
        <label for="name">Product Name</label>
        <input type="text" name="name" id="name" required>
    </div>

    <div>
        <label for="description">Description</label>
        <textarea name="description" id="description" required></textarea>
    </div>

    <div>
        <label for="price">Price</label>
        <input type="number" name="price" id="price" required>
    </div>

    <div id="variants">
        <div class="variant">
            <h4>Variant 1</h4>
            <div>
                <label for="sku">Mã</label>
                <input type="text" name="variants[0][sku]" required>
            </div>
            <div>
                <label for="size">Size</label>
                <input type="text" name="variants[0][size]" required>
            </div>
            <div>
                <label for="color">Color</label>
                <input type="text" name="variants[0][color]" required>
            </div>
            <div>
                <label for="price">Price</label>
                <input type="number" name="variants[0][price]" >
            </div>
            <div>
                <label for="stock">Stock</label>
                <input type="number" name="variants[0][stock]" required>
            </div>
            <div>
                <label for="images">Thumbnail</label>
                <input type="file" name="variants[0][thumbnail]" required>
            </div>
            <div>
                <label for="images">Chọn ảnh cho biến thể (có thể chọn nhiều ảnh):</label>
                <input type="file" name="variants[0][images][]" multiple>
            </div>
        </div>
        <div class="variant 2">
            <h4>Variant 2</h4>
            <div>
                <label for="sku">Mã</label>
                <input type="text" name="variants[1][sku]" required>
            </div>
            <div>
                <label for="size">Size</label>
                <input type="text" name="variants[1][size]" required>
            </div>
            <div>
                <label for="color">Color</label>
                <input type="text" name="variants[1][color]" required>
            </div>
            <div>
                <label for="price">Price</label>
                <input type="number" name="variants[1][price]">
            </div>
            <div>
                <label for="stock">Stock</label>
                <input type="number" name="variants[1][stock]" required>
            </div>
            <div>
                <label for="images">Thumbnail</label>
                <input type="file" name="variants[1][thumbnail]" required>
            </div>
            <div>
                <label for="images">Chọn ảnh cho biến thể (có thể chọn nhiều ảnh):</label>
                <input type="file" name="variants[1][images][]" multiple>
            </div>
        </div>
    </div>

    <button type="submit">Them moi</button>
</form>