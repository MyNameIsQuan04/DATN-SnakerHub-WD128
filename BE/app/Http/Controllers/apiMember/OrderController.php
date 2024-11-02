<?php

namespace App\Http\Controllers\apiMember;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Order_Item;
use Illuminate\Http\Request;
use App\Models\Product_Variant;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Cart_Item;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $orders = Order::whereHas('customer', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->orderByDesc('id')->get();
        $orders->load('orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $userId = Auth::id();
            $validatedData = $request->validate([
                'name' => 'required|string',
                'phone' => 'required|string',
                'address' => 'nullable|string',
                'province' => 'required|string',
                'district' => 'required|string',
                'town' => 'required|string',
                'total_price' => 'required|integer',
                'items' => 'required|array',
                'items.*.product__variant_id' => 'required|integer',
                'items.*.quantity' => 'required|integer',
                'items.*.price' => 'required|integer',
                'items.*.total' => 'required|integer',
            ]);

            $address = $validatedData['address'] . ', ' . $validatedData['town'] . ', ' . $validatedData['district'] . ', ' . $validatedData['province'];

            $dataCustomer = [
                'user_id' => $userId,
                'name' => $validatedData['name'],
                'phone_number' => $validatedData['phone'],
                'address' => $address,
            ];
            $customer = Customer::create($dataCustomer);

            $order = Order::create([
                'customer_id' => $customer->id,
                'total_price' => $validatedData['total_price'],
            ]);

            foreach ($validatedData['items'] as $item) {
                $productVariant = Product_Variant::find($item['product__variant_id']);
                if ($productVariant['stock'] < $item['quantity']) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Có lỗi xảy ra: Số lượng yêu cầu vượt quá tồn kho sản phẩm',
                    ], 500);
                }

                $dataItem = [
                    'order_id' => $order->id,
                    'product__variant_id' => $item['product__variant_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ];

                $cart = Cart::where('user_id', $userId)->first();
                if (isset($cart)) {
                    foreach ($cart->cart_Items as $item) {
                        Cart_Item::where('cart_id', $cart->id)
                            ->where('product__variant_id', $item['product__variant_id'])
                            ->forceDelete();
                    }
                }

                $orderItem = Order_Item::create($dataItem);

                if (isset($orderItem)) {
                    $stock = $productVariant['stock'] - $orderItem['quantity'];
                    $productVariant->update([
                        'stock' => $stock,
                    ]);
                }

                $product = Product::find($productVariant['product_id']);


                $newSalesCount = $product['sales_count'] + $orderItem['quantity'];
                $product->update([
                    'sales_count' => $newSalesCount
                ]);
            }

            $order->load('orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');

            return response()->json([
                'success' => true,
                'message' => 'thành công',
                'order' => $order,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load('orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
        return $order;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            $dataValidate = $request->validate([
                'status' => 'required|in:đã hủy',
            ]);
            foreach ($order->orderItems as $orderItem) {
                $productVariant = Product_Variant::find($orderItem['product__variant_id']);

                $stock = $productVariant['stock'] + $orderItem['quantity'];
                $productVariant->update([
                    'stock' => $stock,
                ]);

                $product = Product::find($productVariant['product_id']);

                $newSalesCount = $product['sales_count'] - $orderItem['quantity'];
                $product->update([
                    'sales_count' => $newSalesCount
                ]);
            }
            $order->update([
                'total_price' => $dataValidate['status'],
            ]);

            $order->load('orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
            return $order;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
