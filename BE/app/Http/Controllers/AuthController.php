<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Đăng ký người dùng mới
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        Cart::create([
            'user_id' => $user->id,
        ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // Đăng nhập người dùng
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    // Đăng xuất người dùng (invalidate token)
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    // Refresh token
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    // Trả về thông tin của user hiện tại
    public function me()
    {
        return response()->json(auth()->user());
    }

    // Phương thức trả về token kèm các thông tin
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->only(['id', 'name', 'email', 'address', 'phone_number', 'type'])
        ]);
    }

    public function forgetPass()
    {
        return view('auth.forgetPass');
    }

    public function postForgetPass(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email',
        ], [
            'email.exists' => 'Email không tồn tại trên hệ thống',
            'email.required' => 'Vui lòng nhập email hợp lệ',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // Gửi email với liên kết đặt lại mật khẩu
            Mail::send('auth.check_email_forget', compact('user'), function ($email) use ($user) {
                $email->to($user->email, $user->name);
                $email->subject('Quên mật khẩu');
            });
            return response()->json(['message' => 'Vui lòng kiểm tra email để thực hiện thay đổi'], 200);
        }

        return response()->json(['error' => 'Email không tồn tại'], 404);
    }

    public function resetPassword($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('login')->withErrors(['error' => 'Người dùng không tồn tại']);
        }

        return view('auth.reset_password', compact('user'));
    }

    public function postResetPassword(Request $request, $userId)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'Người dùng không tồn tại'], 404);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công'], 200);
    }
}
