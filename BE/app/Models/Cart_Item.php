<?php

namespace App\Models;

use App\Models\Product_Variant; // Đổi tên import cho đúng

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart_Item extends Model // Đảm bảo tên class cũng đúng chuẩn
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'cart_id',
        'product_variant_id',
        'quality',
    ];

    // Mối quan hệ với Cart
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    // Mối quan hệ với ProductVariant
    public function product_variant() // Đặt tên theo số ít
    {
        return $this->belongsTo(Product_Variant::class, 'product_variant_id');
    }
}
