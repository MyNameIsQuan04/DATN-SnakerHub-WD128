<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LinkPaymentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $vnpUrl;
    public $customerName;

    public function __construct($vnpUrl, $customerName)
    {
        $this->vnpUrl = $vnpUrl;
        $this->customerName = $customerName;
    }

    public function build()
    {
        $htmlContent = "
        <div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\">
            <h1 style=\"font-family: Arial, sans-serif; color: #2c3e50; font-size: 24px; text-align: center; margin-bottom: 20px;\">
                Xin chào, {$this->customerName}
            </h1>
            <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #7f8c8d; line-height: 1.4; text-align: center;\">
                Vui lòng nhấn vào nút bên dưới để thực hiện thanh toán.(Bỏ qua nếu đã thanh toán)
            </p>
            <div style=\"text-align: center; margin-top: 20px;\">
                <a href=\"{$this->vnpUrl}\" style=\"display: inline-block; padding: 12px 20px; font-size: 16px; font-family: Arial, sans-serif; color: #fff; background-color: #3498db; text-decoration: none; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\">
                    Thanh Toán Ngay
                </a>
            </div>
        </div>
    ";

        return $this->from(config('mail.from.address'))
            ->subject('Đường dẫn thanh toán VNPAY')
            ->html($htmlContent);
    }
}
