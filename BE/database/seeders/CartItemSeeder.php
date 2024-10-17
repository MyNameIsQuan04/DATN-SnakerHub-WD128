<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cart;
use App\Models\Product_Variant;
use App\Models\Cart_Item;
class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Lấy tất cả các giỏ hàng
         $carts = Cart::all();

         // Giả sử có 20 biến thể sản phẩm
         $productVariants = Product_Variant::pluck('id')->toArray();
 
         foreach ($carts as $cart) {
             // Tạo ngẫu nhiên từ 1 đến 5 sản phẩm trong mỗi giỏ hàng
             $itemCount = rand(1, 5);
             for ($j = 0; $j < $itemCount; $j++) {
                 Cart_Item::create([
                     'cart_id' => $cart->id,
                     'product__variant_id' => $productVariants[array_rand($productVariants)],
                     'quality' => rand(1, 5), // Số lượng từ 1 đến 5
                 ]);
             }
         }
    }
}
