<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_variant_id',
        'id',
        'quantity',
        'price',
    ];
    public function order(){
        return $this->belongsTo(Order::class);
    }
    public function productVariant(){
        return $this->belongsTo(Product_Variant::class);
    }
}