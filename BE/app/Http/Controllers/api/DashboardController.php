<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Product_Variant;
use App\Models\Role;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {

        $totalSells = Product::sum('sell_count'); //tổng số sản phẩm đã bán

        $totalStocks = Product_Variant::sum('stock'); //tổng số sản phẩm tồn kho

        $countCustomer = User::where('role_id', Role::where('role','User')->value('id'))->count(); //số khách hàng

        $countOrder = Order::whereNotIn('status', ['Hoàn thành', 'Đã hủy'])->count(); //số đơn hàng chưa hoàn thành

        $countOrderDone = Order::where('status', 'Hoàn thành')->count(); //số đơn hàng đã hoàn thành

        $countOrderDestroy = Order::where('status', 'Đã hủy')->count(); //số đơn hàng đã hủy

        $list5Pro = Product::orderByDesc('sell_count')->limit(5)->get(); //5 sản phẩm bán chạy nhất

        $lowStockProducts = Product_Variant::where('stock', '<', 5)->get(); //sản phẩm sắp hết hàng

        $orders = Order::orderByDesc('id')->get(); //danh sách đơn hàng 

        return response()->json([
            'success' => true,
            'message' => 'thành công!',
            'countCustomer' => $countCustomer,
            'countOrder' => $countOrder,
            'countOrderDone' => $countOrderDone,
            'countOrderDestroy' => $countOrderDestroy,
            'list5Pro' => $list5Pro,
            'lowStockProducts' => $lowStockProducts,
            'totalSells' => $totalSells,
            'totalStocks' => $totalStocks,
            'orders' => $orders,
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

    public function monthly(Request $request)
    {
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
