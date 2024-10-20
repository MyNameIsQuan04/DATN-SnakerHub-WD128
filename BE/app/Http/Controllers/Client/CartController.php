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
    public function index()
{
    // Sử dụng LEFT JOIN để đảm bảo lấy được tất cả các sản phẩm, kể cả khi thiếu màu hoặc kích thước
    $cartItems = Cart_Item::leftJoin('product__variants', 'cart__items.product__variant_id', '=', 'product__variants.id')
        ->leftJoin('products', 'product__variants.product_id', '=', 'products.id')
        ->leftJoin('colors', 'product__variants.color_id', '=', 'colors.id') // Kết nối với bảng colors
        ->leftJoin('sizes', 'product__variants.size_id', '=', 'sizes.id') // Kết nối với bảng sizes
        ->select(
            'cart__items.id',
            'products.name as product_name', // Tên sản phẩm
            'colors.name as name_color', // Tên màu
            'sizes.name as name_size', // Tên kích thước
            'product__variants.price', // Giá biến thể
            'cart__items.quality' // Số lượng trong giỏ hàng
        )
        ->get();

    // Truyền dữ liệu vào view
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
             $total += $item['price'] * $item['quantity'];
         }
 
         return $total;
     }
}
