<?php

use App\Models\Order;
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
        Schema::create('order__items', function (Blueprint $table) {
            $table->foreignIdFor(Order::class)->constrained();

            $table->id();
            $table->string('nameProduct');
            $table->string('color');
            $table->string('size');
            $table->integer('quantity');
            $table->integer('price');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order__items');
    }
};