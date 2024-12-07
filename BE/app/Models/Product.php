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
        'name',
        'description',
        'short_description',
        'price',
        'thumbnail',
        'sell_count',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }
    public function productVariants()
    {
        return $this->hasMany(Product_Variant::class)->withTrashed();
    }
    public function comments()
    {
        return $this->hasMany(Comment::class)->withTrashed();
    }
    public function galleries()
    {
        return $this->hasMany(Gallery::class)->withTrashed();
    }
}