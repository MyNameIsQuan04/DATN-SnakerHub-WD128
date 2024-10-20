<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Đây là Trang Giỏ Hàng</title>
</head>
<table border="1">
    <thead>
        <tr>
            <th>id</th>
            <th>Tên sản phẩm</th>
            <th>Màu</th>
            <th>Kích thước</th>
            <th>Giá (VNĐ)</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
        </tr>
    </thead>
    <tbody>
        @foreach($cartItems as $cartItem)
    <tr>
        <td>{{ $cartItem->id }}</td>
        <td>{{ $cartItem->product_name }}</td>
        <td>{{ $cartItem->name_color }}</td>
        <td>{{ $cartItem->name_size }}</td>
        <td>{{ $cartItem->price }}</td>
        <td>{{ $cartItem->quality }}</td>
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



</body>
</html>
