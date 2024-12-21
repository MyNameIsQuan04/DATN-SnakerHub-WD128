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
            $table->string('order_code')->unique();
            $table->enum('status', ['Chờ xử lý', 'Đã xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Yêu cầu trả hàng', 'Xử lý yêu cầu trả hàng', 'Trả hàng', 'Từ chối trả hàng', 'Hoàn thành', 'Đã hủy'])->default('Chờ xử lý');
            $table->integer('shippingFee');
            $table->enum('status_payment', ['Chưa thanh toán','Đã thanh toán'])->default('Chưa thanh toán');
            $table->integer('total_price');
            $table->string('codeDiscount')->nullable();
            $table->string('discount')->nullable();
            $table->integer('totalAfterDiscount');
            $table->enum('paymentMethod', ['COD','VNPAY']);
            $table->text('paymentURL')->nullable();
            $table->string('note');//ghi chú đơn hàng lúc đặt
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
