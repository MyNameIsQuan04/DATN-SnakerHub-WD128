<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $newStatus;

    public function __construct($order, $newStatus)
    {
        $this->order = $order;
        $this->newStatus = $newStatus;
    }


    public function build()
    {
        {
            $htmlContent = "
                <h1>Xin chào, {$this->order->customer->user->name}</h1>
                <p>Trạng thái đơn hàng {$this->order->order_code} của bạn đã được cập nhật thành \"{$this->newStatus}\".</p>
            ";
    
            return $this->from(env('MAIL_FROM_ADDRESS'))
                        ->subject('Cập nhật trạng thái đơn hàng')
                        ->html($htmlContent);
        }
    }
}
