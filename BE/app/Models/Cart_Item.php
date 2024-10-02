<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart_Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_variant_id',
        'id',
        'quality',
    ];
    public function cart(){
        return $this->belongsTo(Cart::class);
    }
    public function productVariant(){
        return $this->belongsTo(ProductVariant::class);
    }
}