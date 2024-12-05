<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(){
        $countCustomer = User::where('type','user')->count();

        $countOrder = Order::whereNotIn('status', ['Hoàn thành', 'Đã hủy'])->count();

        $countOrderDone = Order::where('status', 'Hoàn thành')->count();

        $countOrderDestroy1 = Order::where('status', 'Đã hủy')->where('note', 'Giao hàng không đúng yêu cầu')->count();
        $countOrderDestroy2 = Order::where('status', 'Đã hủy')->where('note', 'Sản phẩm có lỗi từ nhà cung cấp')->count();
        $countOrderDestroy3 = Order::where('status', 'Đã hủy')->where('note', 'Lý do khác')->count();

        $list5Pro = Product::orderByDesc('sales_count')->get();

        $startDate = Carbon::now()->subDays(7)->startOfDay();

        $endDate =  Carbon::now()->endOfDay();

        $totalRevenue = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_price');

        $dailyRevenue = Order::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, SUM(total_price) as daily_total')
            ->groupBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'thành công!',
            'countCustomer' => $countCustomer,
            'countOrder' => $countOrder,
            'countOrderDone' => $countOrderDone,
            'countOrderDestroy1' => $countOrderDestroy1,
            'countOrderDestroy2' => $countOrderDestroy2,
            'countOrderDestroy3' => $countOrderDestroy3,
            'list5Pro' => $list5Pro,
            'dailyRevenue' => $dailyRevenue,
            'totalRevenue' => $totalRevenue,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ], 201);
    }
    public function daily(Request $request)
    {
        $startDate = $request->input('start_date') ? Carbon::parse($request->input('start_date'))->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $request->input('end_date') ? Carbon::parse($request->input('end_date'))->endOfDay() : Carbon::now()->endOfMonth();

        // Tổng doanh thu
        $totalRevenue = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_price');

        $dailyRevenue = Order::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, SUM(total_price) as daily_total')
            ->groupBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'thành công!',
            'dailyRevenue' => $dailyRevenue,
            'totalRevenue' => $totalRevenue,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ], 201);
    }

    public function monthly(Request $request){
        $startDate = $request->input('start_date') ? Carbon::parse($request->input('start_date'))->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $request->input('end_date') ? Carbon::parse($request->input('end_date'))->endOfDay() : Carbon::now()->endOfMonth();

        // Tổng doanh thu
        $totalRevenue = Order::whereBetween('created_at', [$startDate, $endDate])->sum('total_price');

        $monthlyRevenue = Order::whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(total_price) as monthly_total')
                ->groupBy('year', 'month')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Thành công!',
                'monthlyRevenue' => $monthlyRevenue,
                'totalRevenue' => $totalRevenue,
                'startDate' => $startDate,
                'endDate' => $endDate,
            ], 201);
    }
}
