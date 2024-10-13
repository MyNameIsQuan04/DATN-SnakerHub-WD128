<?php

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
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('categories', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('products', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('colors', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('sizes', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('product__variants', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('carts', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('cart__Items', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('orders', function (Blueprint $table) {
             $table->softDeletes();
        });

        Schema::table('order__Items', function (Blueprint $table) {
             $table->softDeletes();
        });
    
        Schema::table('comments', function (Blueprint $table) {
             $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_tables', function (Blueprint $table) {
            //
        });
    }
};
