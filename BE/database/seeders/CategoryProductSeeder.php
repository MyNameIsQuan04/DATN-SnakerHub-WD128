<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Faker\Factory as Faker;
class CategoryProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker= Faker::create();
        for ($i=0; $i < 5; $i++) {
            $category=Category::create([
                'name'=>$faker->word,
            ]);
        for($j=0; $j < 10; $j++) {
            Product::create([
                'category_id'=>$category->id,
                'name'=>$faker->word,
                'description'=>$faker->sentence,
                'price'=>$faker->numberBetween(500000,800000)
            ]);
    
    }
        }
    }
}
