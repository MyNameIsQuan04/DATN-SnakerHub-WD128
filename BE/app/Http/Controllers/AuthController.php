<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function showRegisterForm(){
        return view('auth.register');
    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'required|string|max:20',
            'address' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'type' => 'user',
        ]);

        return redirect()->route('login')->with('success', 'Đăng kí thành công');
    }

    public function showLoginForm(){
        return view('auth.login');
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return redirect()->route('home');
        }

        return redirect()->back()->with('error', 'Invalid email or password');
    }

    public function logout(){
        Auth::logout();
        return redirect()->route('login')->with('success', 'Logout successfully');
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
        Mail::send('auth.check_email_forget', compact('user'), function($email) use ($user) {
            $email->to($user->email, $user->name);
            $email->subject('Quên mật khẩu');
        });
    }

    return redirect()->back()->with('yes', 'Vui lòng kiểm tra email để thực hiện thay đổi');
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
        return redirect()->route('login')->withErrors(['error' => 'Người dùng không tồn tại']);
    }

    // Cập nhật mật khẩu mới
    $user->password = Hash::make($request->password);
    $user->save();

    return redirect()->route('login')->with('success', 'Mật khẩu đã được đặt lại thành công');
}
}
