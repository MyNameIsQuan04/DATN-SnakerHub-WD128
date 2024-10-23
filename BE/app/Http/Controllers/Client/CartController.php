<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart_Item;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401); // Trả về lỗi 401 nếu không có người dùng nào đang đăng nhập
        }

        // Lấy giỏ hàng của người dùng
        $cart = Cart::where('user_id', auth()->user()->id)->first();

        // Kiểm tra xem giỏ hàng có tồn tại hay không
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404); // Trả về lỗi 404 nếu không tìm thấy giỏ hàng
        }

        // Tải dữ liệu liên quan đến giỏ hàng
        $cart->load('cartItems', 'cartItems.product_variant', 'cartItems.product_variant.color', 'cartItems.product_variant.size', 'cartItems.product_variant.product');

        return $cart; // Trả về giỏ hàng
    }


    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'id' => 'required|integer|exists:products,id', // Kiểm tra sản phẩm có tồn tại không
            'color_id' => 'required|integer|exists:colors,id', // Kiểm tra màu sắc có tồn tại không
            'size_id' => 'required|integer|exists:sizes,id', // Kiểm tra kích thước có tồn tại không
            'quantity' => 'required|integer|min:1', // Số lượng phải lớn hơn 0
        ]);

        $userID = 4;
        // Lấy giỏ hàng của user hiện tại
        $cart = Cart::where('user_id', $userID)->first();
        // Lấy sản phẩm theo id
        $product = Product::find($request->id);

        $variant_id = $product->productVariants()
            ->where('size_id', $request['size_id'])
            ->where('color_id', $request['color_id'])
            ->pluck('id')
            ->first();
        if (!$variant_id) {
            return response()->json(['error' => 'Sản phẩm không có biến thể tương ứng'], 404);
        }

        $cart_item = Cart_Item::create([
            'cart_id' => $cart->id,
            'product__variant_id' => $variant_id,
            'quantity' => $request['quantity'],
        ]);

        $cart_item->load('product_variant.size', 'product_variant.color', 'product_variant.product');
        return response()->json([
            'message' => 'Thêm vào giỏ hàng thành công',
            'cart_item' => $cart_item,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'id' => 'required|integer|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($request->id && $request->quantity) {
            $cart = session()->get('cart');

            if (isset($cart[$request->id])) {
                $cart[$request->id]['quantity'] = $request->quantity;
                session()->put('cart', $cart);
            }

            return redirect()->back()->with('success', 'Giỏ hàng đã được cập nhật!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Tìm sản phẩm trong giỏ hàng dựa trên id
        $cartItem = Cart_Item::find($id);

        if ($cartItem) {
            // Xóa sản phẩm khỏi giỏ hàng
            $cartItem->delete();

            return redirect()->back()->with('success', 'Sản phẩm đã được xóa khỏi giỏ hàng!');
        }

        return redirect()->back()->with('error', 'Sản phẩm không tồn tại trong giỏ hàng!');
    }


    // Tính tổng tiền giỏ hàng
    private function calculateTotal($cart)
    {
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quanlity'];
        }

        return $total;
    }

    // Phương thức để cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateQuantity(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validated = $request->validate([
            'id' => 'required|exists:cart__items,id', // Kiểm tra ID sản phẩm có tồn tại trong giỏ hàng hay không
            'quantity' => 'required|integer|min:1',  // Số lượng tối thiểu là 1
        ]);

        // Tìm sản phẩm trong bảng cart_items dựa theo ID
        $cartItem = Cart_Item::find($validated['id']);

        // Kiểm tra xem sản phẩm có tồn tại không
        if ($cartItem) {
            // Cập nhật số lượng của sản phẩm trong giỏ hàng
            $cartItem->quantity = $validated['quantity'];
            $cartItem->save(); // Lưu lại thay đổi vào cơ sở dữ liệu

            return response()->json([
                'success' => true,
                'message' => 'Số lượng sản phẩm đã được cập nhật thành công',
                'new_total_price' => $cartItem->quanlity * $cartItem->price, // Tính lại tổng giá cho sản phẩm này
            ]);
        }

        // Nếu không tìm thấy sản phẩm trong giỏ hàng
        return response()->json([
            'success' => false,
            'message' => 'Không tìm thấy sản phẩm trong giỏ hàng',
        ], 404);
    }
}
