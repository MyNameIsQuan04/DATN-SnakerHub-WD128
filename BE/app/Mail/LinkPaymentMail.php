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
            <h1 style=\"font-family: Arial, sans-serif; color: #333;\">Xin chào, {$this->customerName}</h1>
            <p style=\"font-family: Arial, sans-serif; font-size: 16px; color: #555;\">
                Đường dẫn thanh toán của bạn là <strong>{$this->vnpUrl}</strong>.
            </p>
            <p style=\"font-family: Arial, sans-serif; font-size: 14px; color: #777;\">
                Bỏ qua nếu đã thanh toán.
            </p>
        ";

        return $this->from(config('mail.from.address'))
                    ->subject('Đường dẫn thanh toán VNPAY')
                    ->html($htmlContent);
    }
}
