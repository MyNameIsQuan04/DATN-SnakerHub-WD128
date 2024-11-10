<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'codeDiscount', 'discount','type', 'expiration_date', 'usage_limit'
    ];

     // Kiểm tra xem voucher còn hiệu lực không
     public function isValid()
     {
         return $this->expiration_date >= now() && $this->usage_limit > 0;
     }
}
