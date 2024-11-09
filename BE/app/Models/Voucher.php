<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'discount', 'type', 'expiry_date', 'usage_limit'
    ];

     // Kiểm tra xem voucher còn hiệu lực không
     public function isValid()
     {
         return $this->expiry_date >= now() && $this->usage_limit > 0;
     }
}
