<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cart extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function cartItems(){
        return $this->hasMany(Cart_Item::class);
    }
}