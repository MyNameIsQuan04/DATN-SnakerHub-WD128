<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Đây là Trang Giỏ Hàng</title>

</head>

<body>
    <h1>Giỏ hàng của bạn</h1>
    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Tên sản phẩm</th>
                <th>Màu</th>
                <th>Kích thước</th>
                <th>Số lượng</th>
                <th>Giá (VNĐ)</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($cartItems as $cartItem)
            <tr>
                <td>{{ $cartItem->id }}</td>
                <td>{{ $cartItem->product_name }}</td>
                <td>{{ $cartItem->name_color }}</td>
                <td>{{ $cartItem->name_size }}</td>
                <td>
                    <!-- Nút giảm số lượng -->
                    <button class="btn btn-secondary quantity-btn" data-id="{{ $cartItem->id }}"
                        data-action="decrease">-</button>

                    <input type="number" class="quantity" id="quantity-{{ $cartItem->id }}"
                        value="{{ $cartItem->quantity }}" disabled>
                    <!-- Nút tăng số lượng -->
                    <button class="btn btn-secondary quantity-btn" data-id="{{ $cartItem->id }}"
                        data-action="increase">+</button>
                </td>
                <td id="price-{{ $cartItem->id }}" class="price" data-unit-price="{{ $cartItem->price }}">
                    {{ number_format($cartItem->price * $cartItem->quantity) }} VNĐ
                </td>
                <td>
                    <form action="{{ route('cart.destroy', $cartItem->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Tổng cộng: <span id="cart-total"></span> VNĐ</h3>

    <script>
        $(document).ready(function() {
            // Cập nhật tổng tiền giỏ hàng lúc đầu
            updateCartTotal();

            // Bắt sự kiện click vào nút tăng/giảm số lượng
            $('.quantity-btn').click(function() {
                var action = $(this).data('action');
                var id = $(this).data('id');
                var quantityElement = $('#quantity-' + id); // Sử dụng quantity thay vì quality
                var currentQuantity = parseInt(quantityElement.val());

                // Kiểm tra nếu currentQuantity là NaN
                if (isNaN(currentQuantity)) {
                    currentQuantity = 1; // Đặt giá trị mặc định
                }

                // Tăng hoặc giảm số lượng
                var newQuantity = (action === 'increase') ? currentQuantity + 1 : currentQuantity - 1;
                newQuantity = Math.max(1, newQuantity); // Ngăn không cho nhỏ hơn 1

                console.log('New Quantity:', newQuantity); // Ghi log giá trị mới

                // Gửi AJAX để cập nhật
                $.ajax({
                    url: '/shop/cart/update-quantity',
                    method: 'POST',
                    data: {
                        _token: '{{ csrf_token() }}',
                        id: id,
                        quantity: newQuantity // Gửi giá trị quantity
                    },
                    success: function(response) {
                        quantityElement.val(newQuantity);
                        var unitPrice = parseFloat($('#price-' + id).data('unit-price'));
                        var newPrice = unitPrice * newQuantity;
                        $('#price-' + id).text(newPrice.toLocaleString('vi-VN') + ' VNĐ');
                        updateCartTotal();
                    },
                    error: function(xhr) {
                        console.log(xhr.responseText);
                    }
                });
            });
            // Hàm cập nhật tổng giá tiền giỏ hàng
            function updateCartTotal() {
                var total = 0;
                $('.price').each(function() {
                    var itemPrice = parseFloat($(this).text().replace(/,/g, '').replace(' VNĐ', ''));
                    total += itemPrice;
                });
                $('#cart-total').text(total.toLocaleString('vi-VN'));
            }
        });
    </script>
</body>

</html>