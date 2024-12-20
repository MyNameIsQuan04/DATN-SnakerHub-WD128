<?php

namespace App\Http\Controllers\api;

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
    // Thêm voucher
    public function store(Request $request)
    {
        $request->validate([
            'codeDiscount' => 'required|unique:vouchers,codeDiscount|max:10',
            'discount' => 'required|numeric|min:1|max:50',
            'type' => 'required|in:percent,amount',
            'start_date' => 'required|date|after_or_equal:today',
            'expiration_date' => 'required|date',
            'usage_limit' => 'required|integer|min:1',
        ]);

        $voucher = Voucher::create([
            'codeDiscount' => $request->codeDiscount,
            'discount' => $request->discount,
            'type' => $request->type,
            'expiration_date' => Carbon::parse($request->expiration_date),
            'usage_limit' => $request->usage_limit,
            'start_date' => Carbon::parse($request->start_date),
        ]);

        return response()->json(['message' => 'Voucher created successfully', 'voucher' => $voucher], 201);
    }

    // Cập nhật voucher
    public function update(Request $request, $id)
    {
        $voucher = Voucher::findOrFail($id);

        $request->validate([
            'codeDiscount' => 'required|max:10|unique:vouchers,codeDiscount,' . $voucher->id,
            'discount' => 'required|numeric|min:1|max:50',
            'type' => 'required|in:percent,amount',
            'expiration_date' => 'required|date',
            'usage_limit' => 'required|integer|min:1',
            'start_date' => 'required|date|after_or_equal:today',
        ]);

        $voucher->update([
            'codeDiscount' => $request->codeDiscount,
            'discount' => $request->discount,
            'type' => $request->type,
            'expiration_date' => Carbon::parse($request->expiration_date),
            'usage_limit' => $request->usage_limit,
            'start_date' => Carbon::parse($request->start_date),
        ]);

        return response()->json(['message' => 'Voucher updated successfully', 'voucher' => $voucher]);
    }

    // Xóa voucher
    public function destroy($id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->delete();

        return response()->json(['message' => 'Voucher deleted successfully']);
    }
    // Lấy thông tin voucher
    public function show($id)
    {
    // Tìm voucher theo id, nếu không có thì trả về lỗi 404
    $voucher = Voucher::findOrFail($id);

    // Trả về thông tin voucher
    return response()->json(['voucher' => $voucher]);
}

}
