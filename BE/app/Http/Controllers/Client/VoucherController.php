<?php

namespace App\Http\Controllers\Client;

use Carbon\Carbon;
use App\Models\Voucher;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VoucherController extends Controller
{
    public function index()
{
    // Lấy danh sách voucher và phân trang nếu cần
    $vouchers = Voucher::all(); // hoặc Voucher::paginate(10) nếu bạn muốn phân trang

    return response()->json(['vouchers' => $vouchers]);
}

public function show($id)
    {
        // Lấy chi tiết voucher
        $voucher = Voucher::findOrFail($id);
        return response()->json($voucher);
    }
}
