<?php

use App\Models\Category;
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
        Schema::create('products', function (Blueprint $table) {
            $table->foreignIdFor(Category::class)->constrained();
            $table->id();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->integer('entry_price');//giá nhập vào
            $table->integer('price');// giá bán ra
            $table->string('thumbnail');
            $table->integer('sell_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};