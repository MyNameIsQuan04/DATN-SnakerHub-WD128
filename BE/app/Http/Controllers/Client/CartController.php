<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Cart_Item;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $user = auth()->user();
        // Lấy thông tin giỏ hàng của người dùng
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['success' => false, 'message' => 'Giỏ hàng không tồn tại!'], 404);
        }

        $cart->load('cart_Items.product_variant', 'cart_Items.product_variant.color', 'cart_Items.product_variant.size', 'cart_Items.product_variant.product');

        return response()->json(['success' => true, 'cart' => $cart]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $user = auth()->user(); // Lấy người dùng từ JWT token
        // if (!$user) {
        //     return response()->json(['success' => false, 'message' => 'Unauthorized, no user found'], 401);
        // }
        $user = JWTAuth::toUser($request->token);
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'color_id' => 'required|integer|exists:colors,id',
            'size_id' => 'required|integer|exists:sizes,id',
        ]);

        //Tạo hoặc Tìm Giỏ hàng : firstOrCreatePhương pháp này được sử dụng để tìm giỏ hàng hiện có cho người dùng hoặc tạo giỏ hàng mới nếu không tồn tại.
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $product = Product::find($request->id);
        $variant_id = $product->productVariants()
            ->where('size_id', $request['size_id'])
            ->where('color_id', $request['color_id'])
            ->pluck('id')
            ->first();
        //Kiểm tra mục giỏ hàng hiện có : Thay vì kiểm tra phiên, nó sẽ kiểm tra cart_itemsbảng để tìm mục hiện có có cùng cart_id, product_variant_id, color_id, và size_id.
        $cartItem = Cart_Item::where('cart_id', $cart->id)
            ->where('product__variant_id', $variant_id)
            ->first();
        //Cập nhật hoặc Tạo mục giỏ hàng : Nếu mục tồn tại, nó sẽ tăng số lượng. Nếu không, nó sẽ tạo một Cart_Itembản ghi mới.
        if ($cartItem) {
            $cartItem->quantity++;
            $cartItem->save();
        } else {
            // Create a new cart item
            $cartItem = new Cart_Item();
            $cartItem->cart_id = $cart->id;
            $cartItem->product__variant_id = $variant_id;
            $cartItem->quantity = 1; // Assuming you want to store the price // Store image if needed
            $cartItem->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Sản phẩm đã được thêm vào giỏ hàng!',
            'cart_item' => $cartItem
        ], 201);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Lấy thông tin người dùng từ token
        $user = auth()->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Tìm sản phẩm trong giỏ hàng
        $cartItem = Cart_Item::where('id', $id)->whereHas('cart', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->first();

        if ($cartItem) {
            // Cập nhật số lượng sản phẩm
            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json([
                'success' => true,
                'message' => 'Số lượng sản phẩm đã được cập nhật!',
                'cart_item' => $cartItem
            ], 200);
        }

        return response()->json(['success' => false, 'message' => 'Sản phẩm không tồn tại trong giỏ hàng!'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Lấy thông tin người dùng từ token
        $user = auth()->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        // Tìm sản phẩm trong giỏ hàng
        $cartItem = Cart_Item::where('id', $id)->whereHas('cart', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->first();

        if ($cartItem) {
            // Xóa sản phẩm khỏi giỏ hàng
            $cartItem->delete();

            return response()->json(['success' => true, 'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng!'], 200);
        }

        return response()->json(['success' => false, 'message' => 'Sản phẩm không tồn tại trong giỏ hàng!'], 404);
    }

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng
     */
    public function updateQuantity(Request $request)
    {
        // Lấy thông tin người dùng từ token
        $user = auth()->user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        // Validate dữ liệu đầu vào
        $request->validate([
            'id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Tìm sản phẩm trong bảng cart_items
        $cartItem = Cart_Item::where('id', $request->id)->whereHas('cart', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->first();

        if ($cartItem) {
            // Cập nhật số lượng của sản phẩm
            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json([
                'success' => true,
                'message' => 'Số lượng sản phẩm đã được cập nhật!',
                'new_total_price' => $cartItem->quantity * $cartItem->price,
                'cart_item' => $cartItem
            ], 200);
        }

        return response()->json(['success' => false, 'message' => 'Không tìm thấy sản phẩm trong giỏ hàng!'], 404);
    }
}
