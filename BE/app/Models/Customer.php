<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'phone_number',
        'address',
    ];

    public function order(){
        return $this->hasMany(Order::class);
    }

    public function user(){
        return $this->belongsTo(Customer::class);
    }
}
