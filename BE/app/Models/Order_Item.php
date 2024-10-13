<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order_Item extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'order_id',
        'product_variant_id',
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