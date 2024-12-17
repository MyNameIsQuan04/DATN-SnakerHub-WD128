<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderDestroyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Tạo một instance mới của mail.
     *
     * @param $order
     */
    public function __construct($order)
    {
        if (!isset($order->customer->user->email)) {
            throw new \Exception("Email khách hàng không tồn tại");
        }

        $this->order = $order;
    }

    /**
     * Xây dựng email.
     *
     * @return $this
     */
    public function build()
    {
        $htmlContent = "
            <div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">
                <h1 style=\"font-family: Arial, sans-serif; color: #2c3e50; font-size: 24px; text-align: center; margin-bottom: 20px;\">
                    Xin chào, {$this->order->customer->name}
                </h1>
                <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; line-height: 1.4; text-align: center;\">
                    Đơn hàng <strong>{$this->order->order_code}</strong> của bạn bị <strong style=\"color: #E74C3C;\">hủy</strong> do bạn chưa thanh toán.
                </p>
            </div>
        ";

        return $this->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('Thông báo: Đơn hàng bị hủy do chưa thanh toán')
            ->html($htmlContent);
    }
}
