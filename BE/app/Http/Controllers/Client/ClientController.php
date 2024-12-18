<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    public function index()
    {
        return view('client.index');
    }

    public function show()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn cần đăng nhập để xem thông tin cá nhân.'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'address' => $user->address,
                'phone_number' => $user->phone_number,
                'gioi_tinh' => $user->gioi_tinh,
                'ngay_sinh' => $user->ngay_sinh,
                'avatar' => $user->avatar,
            ]
        ], 200); 
    }
}
