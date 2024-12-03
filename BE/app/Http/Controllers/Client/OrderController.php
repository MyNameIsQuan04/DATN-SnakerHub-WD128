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
use Str;

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

            $order->update([
                'status' => $dataReturn['status'],
                'note' => $dataReturn['note'],
            ]);

            $order->load('orderItems.productVariant.product', 'orderItems.productVariant.size', 'orderItems.productVariant.color', 'customer');
            return $order;
        }
    }


    public function vnpayPayment(Request $request)
    {
        DB::beginTransaction(); // Bắt đầu giao dịch

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

            $order = Order::create([
                'customer_id' => $customer->id,
                'total_price' => $validatedData['total_price'],
                'order_code' => $orderCode,
            ]);

            foreach ($validatedData['items'] as $item) {
                $productVariant = Product_Variant::find($item['product__variant_id']);
                if ($productVariant['stock'] < $item['quantity']) {
                    DB::rollBack(); // Rollback nếu không đủ hàng
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

            $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            $vnp_Returnurl = "http://localhost:5173/paymentresult";

            $vnp_TmnCode = "KF5D2RKH";
            $vnp_HashSecret = "9X1HLVJCZ6U4VRCTEAJBSRDGJDDANXPW";

            $vnp_TxnRef = $order->order_code;
            $vnp_OrderInfo = "Thanh toán hóa đơn " . $order->order_code;
            $vnp_OrderType = "100002";
            $vnp_Amount = $order->total_price * 100;
            $vnp_Locale = "VN";
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
            $inputData = [
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Amount" => $vnp_Amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => $vnp_OrderInfo,
                "vnp_OrderType" => $vnp_OrderType,
                "vnp_ReturnUrl" => $vnp_Returnurl,
                "vnp_TxnRef" => $vnp_TxnRef
            ];
            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }
            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            DB::commit();

            return $vnp_Url;
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback nếu có lỗi
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function vnpayReturn(Request $request)
{
    // Lấy các tham số cần thiết từ URL trả về
    $vnp_TxnRef = $request->input('vnp_TxnRef'); // Mã đơn hàng
    $vnp_ResponseCode = $request->input('vnp_ResponseCode'); // Mã trạng thái
    $vnp_SecureHash = $request->input('vnp_SecureHash'); // Mã bảo mật

    // Lấy secret key từ cấu hình
    $vnp_HashSecret = "9X1HLVJCZ6U4VRCTEAJBSRDGJDDANXPW"; // Secret key VNPay

    // Lọc các tham số bắt đầu bằng 'vnp_' và loại bỏ 'vnp_SecureHash'
    $inputData = [];
    foreach ($request->all() as $key => $value) {
        if (substr($key, 0, 4) == "vnp_" && $key != "vnp_SecureHash") {
            $inputData[$key] = $value;
        }
    }

    // Sắp xếp tham số theo thứ tự bảng chữ cái
    ksort($inputData);

    // Tạo chuỗi hash data
    $hashData = '';
    foreach ($inputData as $key => $value) {
        $hashData .= urlencode($key) . '=' . urlencode($value) . '&';
    }
    $hashData = rtrim($hashData, '&');

    // Tính toán mã bảo mật
    $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

    // Kiểm tra mã bảo mật và trạng thái giao dịch
    if ($secureHash === $vnp_SecureHash) {
        if ($vnp_ResponseCode == '00') {
            // Giao dịch thành công, cập nhật trạng thái đơn hàng
            $order = Order::where('order_code', $vnp_TxnRef)->first();
            if ($order) {
                $order->update(['status' => 'Đã thanh toán']);
            }

            return response()->json([
                'success' => true,
                'message' => 'Thanh toán thành công',
            ]);
        } else {
            // Giao dịch thất bại
            return response()->json([
                'success' => false,
                'message' => 'Thanh toán thất bại',
            ]);
        }
    } else {
        // Mã bảo mật không hợp lệ
        return response()->json([
            'success' => false,
            'message' => 'Chữ ký không hợp lệ',
        ]);
    }
}

}
