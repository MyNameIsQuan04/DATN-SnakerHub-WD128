<?php

namespace App\Http\Controllers\api;

use App\Models\Order;
use App\Models\Product;
use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Models\Product_Variant;
use App\Jobs\SendOrderStatusEmail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Mail\OrderStatusUpdatedMail;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::orderByDesc('id')->get();
        $orders->load('customer', 'orderItems.productVariant.product');
        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}


    public function show(Order $order)
    {
        $order->load('customer.user', 'orderItems.productVariant.product');
        return $order;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            DB::transaction(function () use ($request, $order) {
                $request->validate([
                    'status' => 'required|in:Chờ xử lý,Đã xác nhận,Đang vận chuyển,Đã giao hàng,Xử lý yêu cầu trả hàng,Từ chối trả hàng,Trả hàng,Hoàn thành,Đã hủy',
                ]);

                $statusOrder = [
                    'Chờ xử lý' => ['Đã xác nhận', 'Đã hủy'],
                    'Đã xác nhận' => ['Đang vận chuyển'],
                    'Đang vận chuyển' => ['Đã giao hàng'],
                    'Đã giao hàng' => ['Hoàn thành'],
                    'Yêu cầu trả hàng' => ['Xử lý yêu cầu trả hàng'],
                    'Xử lý yêu cầu trả hàng' => ['Trả hàng', 'Từ chối trả hàng'],
                    'Trả hàng' => ['Đã hủy'],
                    'Từ chối trả hàng' => ['Hoàn thành'],
                    'Hoàn thành' => [],
                    'Đã hủy' => [],
                ];

                $currentStatus = $order->status;
                $newStatus = $request->status;

                if ($newStatus === 'Đã hủy') {
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
                }

                if (!in_array($newStatus, $statusOrder[$currentStatus])) {
                    throw new \Exception('Không thể thay đổi trạng thái lùi hoặc không hợp lệ!');
                }

                $order->update($request->only('status'));

                $order->load('customer.user', 'orderItems.productVariant.product');

                // Đẩy job vào hàng đợi thay vì gửi email trực tiếp
                SendOrderStatusEmail::dispatch($order, $newStatus);
            });

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công!',
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }


    //  Phương thức Kiểm Tra Mã Giảm Giá
    public function validateVoucher(Request $request)
    {
        $voucherCode = $request->input('codeDiscount');
        $voucher = Voucher::where('codeDiscount', $voucherCode)->first();

        if (!$voucher) {
            return response()->json(['message' => 'Mã giảm giá không tồn tại'], 404);
        }

        if (!$voucher->isValid()) {
            return response()->json(['message' => 'Mã giảm giá đã hết hạn hoặc đã được sử dụng hết'], 400);
        }

        return response()->json([
            'message' => 'Mã giảm giá hợp lệ',
            'discount' => $voucher->discount,
            'type' => $voucher->type,
        ]);
    }
    //  Phương thức áp Dụng Mã Giảm Giá
    public function applyVoucher(Request $request)
    {
        $voucherCode = $request->input('codeDiscount');
        $total_price = $request->input('total_price'); // Tổng tiền giỏ hàng do FE gửi lên

        // Kiểm tra tổng tiền hợp lệ
        if (!is_int($total_price) || $total_price <= 0) {
            return response()->json(['message' => 'Tổng tiền không hợp lệ'], 400);
        }

        $voucher = Voucher::where('codeDiscount', $voucherCode)->first();
        if (!$voucher || !$voucher->isValid()) {
            return response()->json(['message' => 'Mã giảm giá không hợp lệ'], 400);
        }

        // Tính toán mức giảm giá
        $discount = $voucher->type == 'percent'
            ? ($total_price * $voucher->discount) / 100
            : $voucher->discount;

        // Đảm bảo rằng nếu discount lớn hơn total, thì total_after_discount sẽ là 0
        //    $total_after_discount = max($total_price - $discount, 0);

        // Giảm số lần sử dụng còn lại nếu có giới hạn
        if ($voucher->usage_limit !== null) {
            $voucher->decrement('usage_limit');
        }

        $total_price = $total_price - $discount;

        return response()->json([
            'message' => 'Áp dụng mã giảm giá thành công',
            'discount' => min($discount, $total_price), // Giảm giá tối đa chỉ bằng tổng tiền
            'total_price' => $total_price,
        ]);
    }
}
