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
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles  Danh sách vai trò
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {

        // Kiểm tra người dùng đã đăng nhập và vai trò của họ
        if (auth()->check() && in_array(auth()->user()->role->role, $roles)) {
            return $next($request);
        }
    }
}
