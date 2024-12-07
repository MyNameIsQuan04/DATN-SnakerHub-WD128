<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product_Variant extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'color_id',
        'size_id',
        'price',
        'stock',
        'sku',
        'image',
    ];
    public function product(){
        return $this->belongsTo(Product::class)->withTrashed();
    }
    public function size(){
        return $this->belongsTo(Size::class)->withTrashed();
    }
    public function color(){
        return $this->belongsTo(Color::class)->withTrashed();
    }
    public function cartItems(){
        return $this->hasMany(Cart_Item::class);
    }
    public function orderItems(){
        return $this->hasMany(Order_Item::class)->withTrashed();
    }
}