<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'total_price',
        'status',
        'order_code',
        'note',
        'status_payment',
        'discount',
        'totalAfterDiscount',
        'codeDiscount',
        'shippingFee',
        'paymentMethod',
        'totalAfterDiscount',
        'paymentURL',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function orderItems()
    {
        return $this->hasMany(Order_Item::class);
    }
}
