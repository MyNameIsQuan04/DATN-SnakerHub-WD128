<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderPendingPaymentMail extends Mailable
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

        if (!isset($order->paymentURL)) {
            throw new \Exception("Link thanh toán không tồn tại trong đơn hàng");
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
                    Đơn hàng <strong>{$this->order->order_code}</strong> của bạn sẽ bị <strong style=\"color: #E74C3C;\">hủy</strong> sau <strong>5 phút</strong> nếu bạn chưa thanh toán.
                    <br>Vui lòng nhấn vào nút bên dưới để thực hiện thanh toán.
                </p>
                <div style=\"text-align: center; margin-top: 20px;\">
                    <a href=\"{$this->order->paymentURL}\" style=\"display: inline-block; padding: 12px 20px; font-size: 16px; font-family: Arial, sans-serif; color: #fff; background-color: #3498db; text-decoration: none; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\">
                        Thanh Toán Ngay
                    </a>
                </div>
                <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; line-height: 1.4; text-align: center; margin-top: 20px;\">
                    Nếu bạn đã thanh toán, vui lòng bỏ qua thông báo này.
                </p>
            </div>
        ";

        return $this->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('Thông báo: Đơn hàng sắp bị hủy nếu chưa thanh toán')
            ->html($htmlContent);
    }
}
