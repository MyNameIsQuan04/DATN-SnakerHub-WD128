<?php

namespace App\Jobs;

use App\Mail\NewOrderMail;
use App\Mail\OrderStatusUpdatedMail;
use App\Models\Order;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewOrderEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle()
    {
        $usersMail = User::where('type','admin')->pluck('email'); 
        // $customerEmail = 'snakerhub2024@gmail.com';
        foreach ($usersMail as $customerEmail) {
            Mail::to($customerEmail)->send(new NewOrderMail($this->order));
        }
    }
}
