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

    <div>
        <label for="thumbnail">thumbnail</label>
        <input type="file" name="thumbnail" id="thumbnail">
    </div>

    <div>
        <label for="color">color</label>
        <!-- <input type="number" name="color" id="color" required> -->
         <select name="color" id="color" multiple>
            <option value="0">color 1</option>
            <option value="1">color 2</option>
            <option value="2">color 3</option>
         </select>
    </div>

    <div>
        <label for="size">size</label>
        <!-- <input type="number" name="size" id="size" required> -->
         <select name="size" id="size" multiple>
            <option value="0">size 1</option>
            <option value="1">size 2</option>
            <option value="2">size 3</option>
         </select>
    </div>

    <div id="variants"></div>

    <button type="submit">Them moi</button>
</form>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const colorSelect = document.getElementById('color');
    const sizeSelect = document.getElementById('size');
    const variantsContainer = document.getElementById('variants');

    // Mảng chứa các lựa chọn cho màu và kích cỡ (dựa trên các option trong colorSelect và sizeSelect)
    const colors = Array.from(colorSelect.options).map(option => ({ id: option.value, name: option.text }));
    const sizes = Array.from(sizeSelect.options).map(option => ({ id: option.value, name: option.text }));

    function generateVariants() {
        // Xóa các biến thể hiện tại để tạo lại
        variantsContainer.innerHTML = '';
        
        // Lấy các giá trị đã chọn trong các trường color và size
        const selectedColors = Array.from(colorSelect.selectedOptions).map(option => option.value);
        const selectedSizes = Array.from(sizeSelect.selectedOptions).map(option => option.value);

        // Tạo biến thể cho mỗi sự kết hợp giữa color và size
        let variantIndex = 0;
        selectedColors.forEach(colorId => {
            selectedSizes.forEach(sizeId => {
                // Tạo select cho color với giá trị selected
                let colorOptions = `<label for="color">Color</label><select name="variants[${variantIndex}][color_id]">`;
                colors.forEach(color => {
                    colorOptions += `<option value="${color.id}" ${color.id == colorId ? 'selected' : ''}>${color.name}</option>`;
                });
                colorOptions += '</select>';

                // Tạo select cho size với giá trị selected
                let sizeOptions = `<label for="size">Size</label><select name="variants[${variantIndex}][size_id]">`;
                sizes.forEach(size => {
                    sizeOptions += `<option value="${size.id}" ${size.id == sizeId ? 'selected' : ''}>${size.name}</option>`;
                });
                sizeOptions += '</select>';

                // Tạo một div chứa biến thể mới
                const variantDiv = document.createElement('div');
                variantDiv.classList.add('variant');
                variantDiv.innerHTML = `
                    <h4>Variant ${variantIndex + 1}</h4>
                    <div>
                        <label for="sku">Mã</label>
                        <input type="text" name="variants[${variantIndex}][sku]" required>
                    </div>
                    <div>${sizeOptions}</div>
                    <div>${colorOptions}</div>
                    <div>
                        <label for="price">Price</label>
                        <input type="number" name="variants[${variantIndex}][price]" required>
                    </div>
                    <div>
                        <label for="stock">Stock</label>
                        <input type="number" name="variants[${variantIndex}][stock]" required>
                    </div>
                    <div>
                        <label for="image">Chọn ảnh cho biến thể:</label>
                        <input type="file" name="variants[${variantIndex}][image]">
                    </div>
                `;
                
                variantsContainer.appendChild(variantDiv);
                variantIndex++;
            });
        });
    }

    // Thêm sự kiện thay đổi cho các trường color và size
    colorSelect.addEventListener('change', generateVariants);
    sizeSelect.addEventListener('change', generateVariants);
});
</script>