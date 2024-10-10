<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

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
}