<?php
use App\Models\Voucher;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VoucherController extends Controller
{
    // Thêm voucher
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:vouchers,code|max:10',
            'discount' => 'required|numeric|min:1|max:100',
            'type' => 'required|in:percent,amount',
            'expiration_date' => 'required|date',
            'usage_limit' => 'required|integer|min:1',
        ]);

        $voucher = Voucher::create([
            'code' => $request->code,
            'discount' => $request->discount,
            'type' => $request->type,
            'expiration_date' => Carbon::parse($request->expiration_date),
            'usage_limit' => $request->usage_limit,
        ]);

        return response()->json(['message' => 'Voucher created successfully', 'voucher' => $voucher], 201);
    }

    // Cập nhật voucher
    public function update(Request $request, $id)
    {
        $voucher = Voucher::findOrFail($id);

        $request->validate([
            'code' => 'required|max:10|unique:vouchers,code,' . $voucher->id,
            'discount' => 'required|numeric|min:1|max:100',
            'type' => 'required|in:percent,amount',
            'expiration_date' => 'required|date',
            'usage_limit' => 'required|integer|min:1',
        ]);

        $voucher->update([
            'code' => $request->code,
            'discount' => $request->discount,
            'type' => $request->type,
            'expiration_date' => Carbon::parse($request->expiration_date),
            'usage_limit' => $request->usage_limit,
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
}
