<?php

// app/Http/Controllers/Auth/GoogleAuthController.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Google\Service\ServiceConsumerManagement\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class GoogleAuthController extends Controller
{
    public function loginWithGoogle(Request $request)
    {
        $token = $request->input('token');

        // Xác thực token với Google
        $googleUser = Socialite::driver('google')->userFromToken($token);

        if (!$googleUser) {
            return response()->json(['error' => 'Invalid Google token'], 401);
        }

        // Tìm hoặc tạo người dùng
        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'email_verified_at' => now(),
            ]
        );

        // Tạo JWT token
        $jwtToken = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $jwtToken,
            'user' => $user,
        ]);
    }
}
