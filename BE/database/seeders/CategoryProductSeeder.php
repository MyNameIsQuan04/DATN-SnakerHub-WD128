<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\Color;
use App\Models\User; 
use App\Models\Product;
use App\Models\Category;
use App\Models\Comment; 
use Faker\Factory as Faker;
use App\Models\Product_Variant;
use Illuminate\Database\Seeder;

class CategoryProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Tạo dữ liệu cho sizes
        $sizes = ['36', '37', '38', '39', '40', '41', '42'];
        foreach ($sizes as $size) {
            Size::create([
                'name' => $size,
            ]);
        }

        // Tạo dữ liệu cho colors
        $colors = ['Red', 'Blue', 'Green', 'Black', 'Yellow'];
        foreach ($colors as $color) {
            Color::create([
                'name' => $color,
            ]);
        }

        // Lấy lại dữ liệu size và color từ database
        $sizeIds = Size::pluck('id');
        $colorIds = Color::pluck('id');

        // Tạo 5 categories và mỗi category có 10 products
        for ($i = 0; $i < 5; $i++) {
            $category = Category::create([
                'name' => $faker->unique()->word,
            ]);

            for ($j = 0; $j < 10; $j++) {
                $product = Product::create([
                    'category_id' => $category->id,
                    'name' => $faker->unique()->word,
                    'description' => $faker->sentence,
                    'price' => $faker->numberBetween(500000, 800000),
                    'thumbnail' => 'https://via.placeholder.com/150',
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
                    'image' =>'https://via.placeholder.com/150',
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