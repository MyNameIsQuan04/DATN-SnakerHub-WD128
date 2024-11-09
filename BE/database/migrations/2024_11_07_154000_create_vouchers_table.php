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
        Schema::create('vouchers', function (Blueprint $table) {
        $table->id();
        $table->string('code')->unique();  // mã giảm giá duy nhất
        $table->decimal('discount', 8, 2); // giá trị giảm giá
        $table->enum('type', ['fixed', 'percent'])->default('percent'); // loại giảm giá: cố định hoặc theo %
        $table->date('expiry_date'); // ngày hết hạn
        $table->integer('usage_limit')->nullable(); // giới hạn số lần sử dụng (có thể null)
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
