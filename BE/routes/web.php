<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController\OrderController;
use App\Http\Controllers\AdminController\ProductController;
use App\Http\Controllers\AdminController\CategoryController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Illuminate\Http\Request;

Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);


Route::get('/', function () {
    return view('welcome');
});

$crud = [
    'categories' => CategoryController::class,
    'products' => ProductController::class,
    'orders' => OrderController::class,
    
];

Route::prefix('admin')->group(function () use ($crud) {
    foreach ($crud as $key => $controller) {
        Route::resource($key, $controller);
    }
});