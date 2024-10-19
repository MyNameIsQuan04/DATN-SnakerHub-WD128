<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Size;
use App\Models\Color;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\ProductVariant::class;
    public function definition()
    {
        return [
            'product_id' => Product::factory(),
            'size_id' => Size::factory(),
            'color_id' => Color::factory(),
            'price' => $this->faker->numberBetween(500000, 800000),
            'stock' => $this->faker->numberBetween(1, 100),
            'sku' => strtoupper($this->faker->unique()->lexify('SKU???')),
            'thumbnail' => $this->faker->imageUrl(),
            'image' => json_decode([$this->faker->imageUrl(), $this->faker->imageUrl()])
        ];
    }
}
