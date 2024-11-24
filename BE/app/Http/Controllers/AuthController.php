<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

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
    public function showRegisterForm()
    {
        return view('auth.register');
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
        // Lấy user_id từ auth (nếu bạn sử dụng JWT, token sẽ chứa user_id)
        $userId = auth()->id();
    
        // Truy vấn thông tin người dùng dựa trên user_id
        $user = User::find($userId);
    
        if ($user) {
            // Trả về thông tin người dùng dưới dạng JSON
            return response()->json($user);
        } else {
            // Trường hợp không tìm thấy người dùng
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    // Phương thức trả về token kèm các thông tin
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->only(['id', 'name', 'email', 'address', 'phone_number', 'type', 'gender', 'avatar', 'birthday'])
        ]);
    }

    public function forgetPass()
    {
        return view('auth.forgetPass');
    }

    public function postForgetPass(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'Email không tồn tại trên hệ thống',
            'email.required' => 'Vui lòng nhập email hợp lệ',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // Tạo token đặt lại mật khẩu
            $token = Str::random(60);
            DB::table('password_resets')->updateOrInsert(
                ['email' => $user->email],
                [
                    'email' => $user->email,
                    'token' => $token,
                    'created_at' => Carbon::now()
                ]
            );

            // Tạo liên kết reset mật khẩu
            $resetLink = url("http://localhost:5173/reset-password?token={$token}&email=" . urlencode($user->email));

            // Gửi email với liên kết đặt lại mật khẩu
            Mail::send('auth.check_email_forget', ['resetLink' => $resetLink, 'user' => $user], function ($email) use ($user) {
                $email->to($user->email, $user->name);
                $email->subject('Quên mật khẩu');
            });

            return response()->json(['message' => 'Vui lòng kiểm tra email để thực hiện thay đổi'], 200);
        }

        return response()->json(['error' => 'Email không tồn tại'], 404);
    }


    public function postResetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
            'email' => 'required|email',
            'token' => 'required|string',
        ]);

        // Kiểm tra token và email trong bảng password_resets
        $reset = DB::table('password_resets')->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['error' => 'Liên kết đặt lại mật khẩu không hợp lệ'], 400);
        }

        // Tìm người dùng và cập nhật mật khẩu
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'Người dùng không tồn tại'], 404);
        }

        // Cập nhật mật khẩu
        $user->password = Hash::make($request->password);
        $user->save();

        // Xóa token đã sử dụng
        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Mật khẩu đã được thay đổi thành công'], 200);
    }

    // Đăng nhập với Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
    
            // Kiểm tra và tạo hoặc cập nhật người dùng trong hệ thống
            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);
    
            // Tạo JWT cho người dùng
            $token = JWTAuth::fromUser($user);
    
            // Trả về token và thông tin người dùng
            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function authenticateGoogle(Request $request)
    {
        try {
            // Lấy mã code từ frontend
            $code = $request->input('code');
    
            // Sử dụng mã code để lấy token từ Google
            $googleToken = Socialite::driver('google')->stateless()->getAccessTokenResponse($code);
    
            // Lấy thông tin người dùng từ Google
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($googleToken['access_token']);
    
            // Kiểm tra và tạo hoặc cập nhật người dùng trong hệ thống
            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);
    
            // Tạo JWT cho người dùng
            $token = JWTAuth::fromUser($user);
    
            // Trả về token và thông tin người dùng
            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
}
}