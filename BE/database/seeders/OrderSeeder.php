<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Order_Item;
use App\Models\Product_Variant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        for ($i = 0; $i < 10; $i++) { 
            // Reset total cho mỗi đơn hàng mới
            $total = 0;
            
            // Tạo khách hàng
            $customer = Customer::query()->create([
                'user_id' => rand(1, 10),
                'name' => $faker->name,
                'phone_number' => $faker->phoneNumber,
                'address' => $faker->address,
            ]);

            // Tạo đơn hàng
            $order = Order::query()->create([
                'customer_id' => $customer->id,
                'total_price' => $total // Khởi tạo bằng 0
            ]);

            // Tạo các sản phẩm cho đơn hàng
            for ($y = 0; $y < 2; $y++) { 
                // Lấy thông tin sản phẩm variant
                $product_variant = Product_Variant::query()->find(rand(1, 50));

                // Tạo order item
                $order_item = Order_Item::query()->create([
                    'order_id' => $order->id,
                    'product__variant_id' => $product_variant->id,
                    'quantity' => $quantity = rand(1, 5),
                    'price' => $product_variant->price,
                ]);

                // Cộng tổng giá
                $total += $quantity * $product_variant->price;
            }

            // Cập nhật lại tổng giá trị cho đơn hàng
            $order->update(['total_price' => $total]);
        }
    }
}
