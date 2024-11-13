<?php

use App\Models\Customer;
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

            $table->foreignIdFor(Customer::class)->constrained();

            $table->id();
            $table->integer('total_price');
            $table->enum('status', ['Chờ xử lý', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Trả hàng', 'Hoàn thành', 'Đã hủy'])->default('Chờ xử lý');

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
