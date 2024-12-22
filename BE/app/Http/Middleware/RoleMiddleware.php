<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {

        // Kiểm tra người dùng đã đăng nhập và vai trò của họ
        if (auth()->check() && auth()->user()->role === $role) {
            return $next($request);
        }

        // Nếu không đúng vai trò, trả về lỗi
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
