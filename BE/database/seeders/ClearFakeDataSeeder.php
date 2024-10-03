<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Size; // Thay đổi model theo nhu cầu
use App\Models\Color; 
use App\Models\Product;
use App\Models\Product_Variant;
use App\Models\Comment;
class ClearFakeDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tắt ràng buộc khóa ngoại
    \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    \App\Models\Product_Variant::truncate();
    \App\Models\Comment::truncate();
    \App\Models\Size::truncate();
    \App\Models\Color::truncate();
    \App\Models\Product::truncate();
         // Bật lại ràng buộc khóa ngoại
    \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
