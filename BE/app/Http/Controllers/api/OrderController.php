<?php

namespace App\Http\Controllers\api;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
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
                    'status' => 'required|in:Chờ xử lý,Đã xác nhận,Đang vận chuyển,Đã giao hàng,Hoàn thành',
                ]);

                $statusOrder = [
                    'Chờ xử lý' => ['Đã xác nhận'],
                    'Đã xác nhận' => ['Đang vận chuyển'],
                    'Đang vận chuyển' => ['Đã giao hàng'],
                    'Đã giao hàng' => ['Hoàn thành'],
                    'Hoàn thành' => []
                ];

                $currentStatus = $order->status;
                $newStatus = $request->status;

                if (!in_array($newStatus, $statusOrder[$currentStatus])) {
                    throw new \Exception('Không thể thay đổi trạng thái lùi hoặc không hợp lệ!');
                }
                $order->update($request->only('status'));
            });

            $order->load('customer.user', 'orderItems.productVariant.product');

            return response()->json([
                'success' => true,
                'message' => 'Cập nhật thành công!',
                'product' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }
}
