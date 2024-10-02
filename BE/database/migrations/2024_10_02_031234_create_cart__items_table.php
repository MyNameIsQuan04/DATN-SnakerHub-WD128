<?php

use App\Models\Cart;
use App\Models\Product_Variant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart__items', function (Blueprint $table) {
            
            $table->foreignIdFor(Cart::class)->constrained();
            $table->foreignIdFor(Product_Variant::class)->constrained();

            $table->id();
            $table->integer('quality');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart__items');
    }
};
