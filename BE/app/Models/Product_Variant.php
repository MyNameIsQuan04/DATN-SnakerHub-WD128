<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product_Variant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'color_id',
        'size_id',
        'id',
        'price',
        'stock',
        'sku',
        'thumbnail',
        'images',
    ];
    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function size(){
        return $this->belongsTo(Size::class);
    }
    public function color(){
        return $this->belongsTo(Color::class);
    }
    public function cartItems(){
        return $this->hasMany(Cart_Item::class);
    }
    public function orderItems(){
        return $this->hasMany(Order_Item::class);
    }
}