<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cart;
use App\Models\Product_variant;
use App\Models\User;
use App\Models\Order;
use App\Models\Order_item;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\Size;
use App\Models\Color;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

use Faker\Factory as Faker;
class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 1; $i <= 10; $i++) {
            Cart::create([
                'user_id' => $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
