<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Order_Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Nette\Utils\Random;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $total = 0;
        for ($i=0; $i < 10; $i++) { 
            $order = Order::query()->create([
                'user_id' => rand(1, 10),
                'total_price' => 0,
            ]);

            for ($y=0; $y < 2; $y++) { 
                $order_item = Order_Item::query()->create([
                    'order_id' => $order->id,
                    'product__variant_id' => rand(1, 50),
                    'quantity' => rand(1, 5),
                    'price' => rand(100000, 500000),
                ]);
                $total = $total + ($order_item->quantity * $order_item->price);
            }

            $order->update([
                'total_price' => $total
            ]);
        }
    }
}
