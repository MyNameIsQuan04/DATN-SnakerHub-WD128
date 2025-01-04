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
        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comment_id'); // Liên kết đến bảng bình luận
            $table->unsignedBigInteger('admin_id'); // ID của admin trả lời
            $table->text('content'); // Nội dung trả lời
            $table->timestamps();
            // Thiết lập khóa ngoại
            $table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
