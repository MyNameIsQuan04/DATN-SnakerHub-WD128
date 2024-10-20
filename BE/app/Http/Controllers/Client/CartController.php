<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
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
    // Sử dụng LEFT JOIN để đảm bảo lấy được tất cả các sản phẩm, kể cả khi thiếu màu hoặc kích thước
    $cartItems = Cart_Item::leftJoin('product__variants', 'cart__items.product__variant_id', '=', 'product__variants.id')
        ->leftJoin('products', 'product__variants.product_id', '=', 'products.id')
        ->leftJoin('colors', 'product__variants.color_id', '=', 'colors.id')
        ->leftJoin('sizes', 'product__variants.size_id', '=', 'sizes.id')
        ->select(
            'cart__items.id',
            'products.name as product_name',
            'colors.name as name_color',
            'sizes.name as name_size',
            'product__variants.price',
            'cart__items.quantity'
        )
        ->get();

    // Kiểm tra nếu yêu cầu là AJAX hoặc API thì trả về JSON
    if ($request->wantsJson() || $request->is('api/*')) {
        return response()->json([
            'success' => true,
            'data' => $cartItems,
        ]);
    }

    // Truyền dữ liệu vào view cho giao diện người dùng
    return view('client.cart.index', compact('cartItems'));
}

    


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = Product::find($request->id);
        $cart = session()->get('cart', []);

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity']++;
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            $cart[$product->id] = [
                "name" => $product->name,
                "quality" => 1,
                "price" => $product->price,
                "image" => $product->image,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->back()->with('success', 'Sản phẩm đã được thêm vào giỏ hàng!');
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