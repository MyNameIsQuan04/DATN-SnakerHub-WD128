<?php

namespace App\Jobs;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Log;
use App\Mail\OrderStatusUpdatedMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateDeliveredStatusJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    
    public function __construct()
    {
    }

    public function handle()
    {
        $orders = Order::where('status', 'Đã giao hàng')
            ->where('updated_at', '<=', Carbon::now()->subMinutes(2))
            ->get();

        foreach ($orders as $order) {
            $order->update([
                'status' => 'Hoàn thành',
            ]);
            
            $customerEmail = $order->customer->user->email;
            Mail::to($customerEmail)->send(new OrderStatusUpdatedMail($order, 'Hoàn thành'));
        }
    }
}
