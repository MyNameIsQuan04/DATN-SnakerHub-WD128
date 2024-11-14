<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('gateway', 100);  // Cổng thanh toán
            $table->timestamp('transaction_date')->default(DB::raw('CURRENT_TIMESTAMP'));  // Thời gian giao dịch
            $table->string('account_number', 100)->nullable();  // Số tài khoản (có thể null)
            $table->string('sub_account', 250)->nullable();  // Tài khoản con (có thể null)
            $table->decimal('amount_in', 20, 2)->default(0.00);  // Số tiền vào
            $table->decimal('amount_out', 20, 2)->default(0.00);  // Số tiền ra
            $table->decimal('accumulated', 20, 2)->default(0.00);  // Số dư tích lũy
            $table->string('code', 250)->nullable();  // Mã giao dịch (có thể null)
            $table->text('transaction_content')->nullable();  // Nội dung giao dịch (có thể null)
            $table->string('reference_number', 255)->nullable();  // Mã tham chiếu (có thể null)
            $table->text('body')->nullable();  // Thân giao dịch (có thể null)
            $table->timestamps();  // Các trường created_at, updated_at
            
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_transactions');
    }
};
