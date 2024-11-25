<?php

namespace App\Http\Controllers\Client;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Order_Item;
use Illuminate\Http\Request;
use App\Models\Product_Variant;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Cart_Item;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Voucher;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    private function generateOrderCode()
    {
        $prefix = 'ORD';
        $timestamp = time();
        $randomString = strtoupper(substr(md5(uniqid(mt_rand(), true)), 1, 5));

        return $prefix . $timestamp . $randomString;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $orders = Order::whereHas('customer', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->orderByDesc('id')->get();
        $orders->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
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
                'payment' => 'required|integer',
                'items' => 'required|array',
                'items.*.product__variant_id' => 'required|integer',
                'items.*.quantity' => 'required|integer',
                'items.*.price' => 'required|integer',
            ]);

            $address = $validatedData['address'] . ', ' . $validatedData['town'] . ', ' . $validatedData['district'] . ', ' . $validatedData['province'];

            $dataCustomer = [
                'user_id' => $userId,
                'name' => $validatedData['name'],
                'phone_number' => $validatedData['phone'],
                'address' => $address,
            ];
            $customer = Customer::create($dataCustomer);

            $orderCode = $this->generateOrderCode();

            if ($validatedData['payment'] == 2) {
                $linkQR = 'https://qr.sepay.vn/img?bank=MBBank&acc=0974290440&template=compact&amount=' . $validatedData['total_price'] . '&des=' . $orderCode;
            }

            $order = Order::create([
                'customer_id' => $customer->id,
                'total_price' => $validatedData['total_price'],
                'order_code' => $orderCode,
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
            $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');

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
        $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
        return $order;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            if ($order['status'] === 'Chờ xử lý') {
                $dataValidate = $request->validate([
                    'status' => 'required|in:Đã hủy',
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
                    'status' => $dataValidate['status'],
                ]);
                $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
                return $order;
            } else if ($order['status'] === 'Đã giao hàng') {
                $dataValidate = $request->validate([
                    'status' => 'required|in:Hoàn thành',
                ]);
                $order->update([
                    'status' => $dataValidate['status'],
                ]);
                $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
                return $order;
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra: không thể thay đổi',
                ], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function returnOrder(Request $request, Order $order)
    {
        if ($order['status'] === 'Đã giao hàng') {
            $dataReturn = $request->validate([
                'status' => 'required|in:Yêu cầu trả hàng',
                'note' => 'required|in:Giao hàng không đúng yêu cầu,Sản phẩm có lỗi từ nhà cung cấp,Lý do khác',
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
                'status' => $dataReturn['status'],
                'note' => $dataReturn['note'],
            ]);

            $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
            return $order;
        }
    }
}
