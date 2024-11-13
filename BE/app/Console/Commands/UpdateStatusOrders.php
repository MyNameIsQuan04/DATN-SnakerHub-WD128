<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Console\Command;

class UpdateStatusOrders extends Command
{
    protected $signature = 'orders:update-delivered-status';
    protected $description = 'Cập nhật trạng thái đơn hàng từ "Đã giao hàng" thành "Hoàn thành" sau 24 giờ';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Tìm các đơn hàng có trạng thái "Đã giao hàng" và đã quá 24 giờ
        $orders = Order::where('status', 'Đã giao hàng')
            ->where('updated_at', '<=', Carbon::now()->subHours(24))
            ->get();

        foreach ($orders as $order) {
            $order->status = 'Hoàn thành';
            $order->save();
            $this->info("Đơn hàng ID {$order->order_code} đã được cập nhật thành 'Hoàn thành'");
        }

        $this->info("Đã cập nhật trạng thái các đơn hàng 'Đã giao hàng' thành 'Hoàn thành' sau 24 giờ.");
    }
}
