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
        Schema::create('slides', function (Blueprint $table) {
            $table->id();
            $table->string('title');  // Tiêu đề slide
            $table->string('image');  // Hình ảnh slide
            $table->string('link')->nullable();  // Link nếu có
            $table->integer('status')->default(1);  // Trạng thái (1: hiển thị, 0: ẩn)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slides');
    }
};
