<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'id',
        'name',
        'description',
        'price',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function productVariants(){
        return $this->hasMany(Product_Variant::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }
    public function orderItems(){
        return $this->hasMany(Order_Item::class);
    }
}