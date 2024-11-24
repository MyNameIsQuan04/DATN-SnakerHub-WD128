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
        if (!isset($order->customer->user->email)) {
            throw new \Exception("Email khách hàng không tồn tại");
        }

        $this->order = $order;
        $this->newStatus = $newStatus;
    }



    public function build()
    { {
            $htmlContent = "
                <h1 style=\"font-family: Arial, sans-serif; color: #333;\">Xin chào, {$this->order->customer->user->name}</h1>
                <p style=\"font-family: Arial, sans-serif; font-size: 16px; color: #555;\">
                    Trạng thái đơn hàng <strong>{$this->order->order_code}</strong> của bạn đã được cập nhật thành <strong style=\"color: #2E86C1;\">{$this->newStatus}</strong>.
                </p>
                <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #777;\">
                    Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với chúng tôi.
                </p>
            ";


            return $this->from(config('mail.from.address'))
                ->subject('Cập nhật trạng thái đơn hàng')
                ->html($htmlContent);
        }
    }
}
