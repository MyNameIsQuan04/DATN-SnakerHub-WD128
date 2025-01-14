<?php

namespace App\Http\Controllers\api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Order;
use App\Models\History;
use App\Models\Product;
use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Models\Product_Variant;
use App\Services\HistoryService;
use App\Jobs\SendOrderStatusEmail;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Jobs\SendKhieuNaiOrderEmail;
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
        $orders->load('customer', 'orderItems');
        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}


    public function show(Order $order)
    {
        $order->load('customer.user', 'orderItems');
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
                    'Yêu cầu trả hàng' => ['Xử lý yêu cầu trả hàng', 'Đã giao hàng'],
                    'Xử lý yêu cầu trả hàng' => ['Trả hàng'],
                    'Trả hàng' => ['Đã hủy'],
                    'Từ chối trả hàng' => ['Hoàn thành'],
                    'Hoàn thành' => [],
                    'Đã hủy' => [],
                ];

                $currentStatus = $order->status;
                $newStatus = $request->status;

                if ($currentStatus === 'Chờ xử lý' && $order->status_payment === 'Chưa thanh toán' && $newStatus === 'Đã xác nhận') {
                    throw new \Exception('Không thể thay đổi trạng thái cho đơn thanh toán online chưa thanh toán!');
                }

                if ($newStatus === 'Đã hủy') {
                    if ($order->status_payment === 'Đã thanh toán') {
                        $order->update([
                            'status_payment' => 'Chờ hoàn tiền',
                        ]);
                    }
                    foreach ($order->orderItems as $orderItem) {
                        $product_id = Product::where('name', $orderItem['nameProduct'])->value('id');

                        $productVariant = Product_Variant::where('color', $orderItem['color'])->where('size', $orderItem['size'])
                            ->where('product_id', $product_id)->first();

                        $stock = $productVariant['stock'] + $orderItem['quantity'];
                        $productVariant->update([
                            'stock' => $stock,
                        ]);

                        $product = Product::find($product_id);

                        $newSellCount = $product['sell_count'] - $orderItem['quantity'];
                        $product->update([
                            'sell_count' => $newSellCount
                        ]);
                    }
                }
                if ($newStatus === 'Xử lý yêu cầu trả hàng') {
                    if ($order->status_payment === 'Đã thanh toán') {
                        $order->update([
                            'status_payment' => 'Đã thanh toán',
                        ]);
                    }
                    foreach ($order->orderItems as $orderItem) {
                        $product_id = Product::where('name', $orderItem['nameProduct'])->value('id');

                        $productVariant = Product_Variant::where('color', $orderItem['color'])->where('size', $orderItem['size'])
                            ->where('product_id', $product_id)->first();

                        $stock = $productVariant['stock'] + $orderItem['quantity'];
                        $productVariant->update([
                            'stock' => $stock,
                        ]);

                        $product = Product::find($product_id);

                        $newSellCount = $product['sell_count'] - $orderItem['quantity'];
                        $product->update([
                            'sell_count' => $newSellCount
                        ]);
                    }
                }
                if ($newStatus === 'Trả hàng') {
                    if ($order->status_payment === 'Đã thanh toán') {
                        $order->update([
                            'status_payment' => 'Chờ hoàn tiền',
                        ]);
                    }
                    foreach ($order->orderItems as $orderItem) {
                        $product_id = Product::where('name', $orderItem['nameProduct'])->value('id');

                        $productVariant = Product_Variant::where('color', $orderItem['color'])->where('size', $orderItem['size'])
                            ->where('product_id', $product_id)->first();

                        $stock = $productVariant['stock'] + $orderItem['quantity'];
                        $productVariant->update([
                            'stock' => $stock,
                        ]);

                        $product = Product::find($product_id);

                        $newSellCount = $product['sell_count'] - $orderItem['quantity'];
                        $product->update([
                            'sell_count' => $newSellCount
                        ]);
                    }
                }


                if (!in_array($newStatus, $statusOrder[$currentStatus])) {
                    throw new \Exception('Không thể thay đổi trạng thái lùi hoặc không hợp lệ!');
                }

                if ($request['status'] == 'Đã giao hàng') {
                    $order->update([
                        'status' => $request['status'],
                        'status_payment' => 'Đã thanh toán',
                    ]);
                } else {
                    $order->update($request->only('status'));
                }

                $order->load('customer.user', 'orderItems');

                // Đẩy job vào hàng đợi thay vì gửi email trực tiếp
                SendOrderStatusEmail::dispatch($order, $newStatus);

                HistoryService::log('orders', $order->id, 'update', $currentStatus, $newStatus);
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

    public function updatePaymentStatus(Request $request, Order $order)
    {
        try {
            $request->validate([
                'status_payment' => 'required|in:Đã hoàn tiền',
            ]);

            $order->update($request->only('status_payment'));

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
        $total_price = $request->input('total_price'); // Tổng tiền giỏ hàng từ FE

        // Kiểm tra tổng tiền hợp lệ
        if (!is_numeric($total_price) || $total_price <= 0) {
            return response()->json(['message' => 'Tổng tiền không hợp lệ'], 400);
        }


        // Tìm mã giảm giá
        $voucher = Voucher::where('codeDiscount', $voucherCode)->first();
        if (!$voucher || !$voucher->isValid()) {
            return response()->json(['message' => 'Mã giảm giá không hợp lệ hoặc đã hết hạn'], 400);
        }

        // Kiểm tra điều kiện tổng tiền tối thiểu để áp dụng mã giảm giá
        if ($voucher->minimum_order_value > $total_price) {
            return response()->json([
                'message' => 'Mã giảm giá chỉ áp dụng cho đơn hàng từ ' . number_format($voucher->minimum_order_value) . ' VNĐ trở lên.'
            ], 400);
        }

        // Tính toán mức giảm giá
        $discount = 0;
        if ($voucher->type === 'percent') {
            $discount = ($total_price * $voucher->discount) / 100;

            // Giới hạn mức giảm tối đa nếu có
            if ($voucher->max_discount !== null) {
                $discount = min($discount, $voucher->max_discount);
            }
        } elseif ($voucher->type === 'fixed') {
            $discount = $voucher->discount;
        }

        // Đảm bảo giảm giá không vượt quá tổng tiền
        $discount = min($discount, $total_price);
        $total_price_after_discount = $total_price - $discount;

        // Cập nhật số lần sử dụng mã giảm giá (nếu có giới hạn)
        if ($voucher->usage_limit !== null) {
            $voucher->decrement('usage_limit');
        }

        // Trả về kết quả
        return response()->json([
            'message' => 'Áp dụng mã giảm giá thành công',
            'discount' => $discount, // Giảm giá sau khi áp dụng giới hạn
            'original_total_price' => $total_price,
            'total_price_after_discount' => $total_price_after_discount,
        ]);
    }
}
