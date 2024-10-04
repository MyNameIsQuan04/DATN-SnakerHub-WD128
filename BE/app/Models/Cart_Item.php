<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart_Item extends Model
{
    use HasFactory;
    use SoftDeletes;

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
        return $this->belongsTo(Product_Variant::class);
    }
}