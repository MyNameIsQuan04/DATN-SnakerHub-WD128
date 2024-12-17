<?php

namespace App\Jobs;

use App\Mail\OrderDestroyMail;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Bus\Queueable;
use App\Models\Product_Variant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderPendingPaymentMail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class DeleteUnpaidVNPayOrdersJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        $orders15p = Order::where('status', 'Chờ xử lý')
            ->where('status_payment', 'Chưa thanh toán')
            ->where('paymentMethod', 'VNPAY')
            ->where('updated_at', '<=', Carbon::now()->subSeconds(15))
            ->get();
        
        foreach ($orders15p as $order) {
            $customerEmail = $order->customer->user->email;
            Mail::to($customerEmail)->send(new OrderPendingPaymentMail($order));
        }

        $orders = Order::where('status', 'Chờ xử lý')
            ->where('status_payment', 'Chưa thanh toán')
            ->where('paymentMethod', 'VNPAY')
            ->where('updated_at', '<=', Carbon::now()->subMinutes(2))
            ->get();

        foreach ($orders as $order) {
            foreach ($order->orderItems as $orderItem) {
                $productVariant = Product_Variant::find($orderItem['product__variant_id']);
                if ($productVariant) {
                    $productVariant->update([
                        'stock' => $productVariant->stock + $orderItem['quantity'],
                    ]);

                    $product = Product::find($productVariant->product_id);
                    if ($product) {
                        $product->update([
                            'sell_count' => $product->sell_count - $orderItem['quantity'],
                        ]);
                    }
                }
            }

            $customerEmail = $order->customer->user->email;
            Mail::to($customerEmail)->send(new OrderDestroyMail($order));

            $order->load('orderItems');
            foreach ($order->orderItems as $orderItem) {
                $orderItem->forceDelete();
            }
            $order->forceDelete();
        }
    }
}
