<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewOrderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }
// snakerhub2024@gmail.com
public function build()
{
    // Tạo nội dung email theo kiểu HTML
    $htmlContent = "
        <div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">
            <h1 style=\"font-family: Arial, sans-serif; color: #2c3e50; font-size: 24px; text-align: center; margin-bottom: 20px;\">
                Thông báo đơn hàng mới từ {$this->order->customer->name}
            </h1>
            <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; line-height: 1.4; text-align: center;\">
                Đơn hàng <strong>{$this->order->order_code}</strong> đã được đặt. Dưới đây là các thông tin chi tiết:
            </p>
            <ul style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; line-height: 1.4;\">
                <li><strong>Mã đơn hàng:</strong> {$this->order->order_code}</li>
                <li><strong>Khách hàng:</strong> {$this->order->customer->name}</li>
                <li><strong>Email khách hàng:</strong> {$this->order->customer->user->email}</li>
                <li><strong>Số điện thoại:</strong> {$this->order->customer->phone_number}</li>
                <li><strong>Giá trị đơn hàng:</strong> {$this->order->total_price}</li>
                <li><strong>Phí ship:</strong> {$this->order->shippingFee}</li>
                <li><strong>Mã giảm giá:</strong> {$this->order->codeDiscount}</li>
                <li><strong>Số tiền được giảm giá:</strong> {$this->order->discount}</li>
                <li><strong>Tổng giá trị:</strong> {$this->order->totalAfterDiscount}</li>
            </ul>
            <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; text-align: center;\">
                Vui lòng kiểm tra và xử lý đơn hàng này.
            </p>
        </div>
    ";

    return $this->from(config('mail.from.address'), config('mail.from.name'))
                ->subject('Thông báo: Đơn hàng mới từ khách hàng')
                ->html($htmlContent);
}

}
