<?php

use App\Models\User;
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
        Schema::create('orders', function (Blueprint $table) {

            $table->foreignIdFor(model: User::class)->constrained();

            $table->id();
            $table->integer('total_price');
            $table->enum('status', ['chờ xử lý', 'đã xác nhận', 'đang vận chuyển', 'hoàn thành', 'đã hủy'])->default('chờ xử lý');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};