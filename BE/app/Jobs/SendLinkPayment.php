<?php

namespace App\Jobs;

use App\Mail\LinkPaymentMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendLinkPayment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $vnpUrl;
    protected $customerEmail;
    protected $customerName;

    public function __construct($vnpUrl, $customerEmail, $customerName)
    {
        $this->vnpUrl = $vnpUrl;
        $this->customerEmail = $customerEmail;
        $this->customerName = $customerName;
    }

    public function handle()
    {
        Mail::to($this->customerEmail)
            ->send(new LinkPaymentMail($this->vnpUrl, $this->customerName));
    }
}
