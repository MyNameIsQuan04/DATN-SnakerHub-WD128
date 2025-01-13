<?php

namespace App\Jobs;

use App\Models\Role;
use App\Models\User;
use App\Models\Order;
use App\Mail\NewOrderMail;
use Illuminate\Bus\Queueable;
use App\Mail\KhieuNaiOrderMail;
use App\Mail\OrderStatusUpdatedMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendKhieuNaiOrderEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function handle()
    {
        $usersMail = User::where('role_id', Role::where('role', 'Admin')->value('id'))->pluck('email');
        // $customerEmail = 'snakerhub2024@gmail.com';
        foreach ($usersMail as $customerEmail) {
            Mail::to($customerEmail)->send(new KhieuNaiOrderMail($this->order));
        }
    }
}
