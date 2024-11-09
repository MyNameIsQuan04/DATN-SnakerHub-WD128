<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voucher;
class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Voucher::create([
            'code' => 'DISCOUNT10',
            'discount' => 10,
            'type' => 'percent',
            'expiry_date' => now()->addDays(30),
            'usage_limit' => 100,
        ]);
    }
}
