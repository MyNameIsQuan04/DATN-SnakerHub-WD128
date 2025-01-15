<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\History;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        $histories = History::orderByDesc('id')->get()->load('user');
        return response()->json($histories);
    }
    public function historyFilter(Request $request)
    {
        $startDate = $request['start_date'] ? Carbon::parse($request['start_date'])->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = $request['end_date'] ? Carbon::parse($request['end_date'])->endOfDay() : Carbon::now()->endOfMonth();
        $histories = History::whereBetween('created_at', [$startDate, $endDate])->orderByDesc('id')->get()->load('user');
        return response()->json($histories);
    }
}
