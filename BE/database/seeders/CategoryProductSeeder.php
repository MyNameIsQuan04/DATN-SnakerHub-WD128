<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Product_Variant;
use App\Models\Size;
use App\Models\Color;
use App\Models\Comment; 
use App\Models\User; 
use Faker\Factory as Faker;

class CategoryProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Tạo dữ liệu cho sizes
        $sizes = ['36', '37', '38', '39', '40', '41', '42'];
        foreach ($sizes as $size) {
            \DB::table('sizes')->insert([
                'name' => $size,
            ]);
        }

        // Tạo dữ liệu cho colors
        $colors = ['Red', 'Blue', 'Green', 'Black', 'Yellow'];
        foreach ($colors as $color) {
            \DB::table('colors')->insert([
                'name' => $color,
            ]);
        }

        // Lấy lại dữ liệu size và color từ database
        $sizeIds = \DB::table('sizes')->pluck('id');
        $colorIds = \DB::table('colors')->pluck('id');

        // Tạo 5 categories và mỗi category có 10 products
        for ($i = 0; $i < 5; $i++) {
            $category = Category::create([
                'name' => $faker->word,
            ]);

            for ($j = 0; $j < 10; $j++) {
                $product = Product::create([
                    'category_id' => $category->id,
                    'name' => $faker->word,
                    'description' => $faker->sentence,
                    'price' => $faker->numberBetween(500000, 800000),
                ]);

                // Chọn ngẫu nhiên size và color cho mỗi sản phẩm
                $randomSizeId = $faker->randomElement($sizeIds);
                $randomColorId = $faker->randomElement($colorIds);

                // Tạo một biến thể sản phẩm cho mỗi sản phẩm
                Product_Variant::create([
                    'product_id' => $product->id,
                    'size_id' => $randomSizeId,
                    'color_id' => $randomColorId,
                    'price' => $faker->numberBetween(10000, 1000000),
                    'stock' => $faker->numberBetween(1, 100),
                    'sku' => 'SKU-' . strtoupper(uniqid()),
                    'thumbnail' => 'https://via.placeholder.com/150',
                    'images' => json_encode([
                        'https://via.placeholder.com/150',
                        'https://via.placeholder.com/150'
                    ]),
                ]);

                // Tạo comment cho mỗi sản phẩm
                for ($k = 0; $k < 5; $k++) {
                    Comment::create([
                        'product_id' => $product->id,
                        'user_id' => $faker->numberBetween(1, 10), // Giả sử có từ 1 đến 10 người dùng
                        'content' => $faker->sentence,
                        'star' => $faker->numberBetween(1, 5),
                    ]);
                }
            }
        }
    }
}
