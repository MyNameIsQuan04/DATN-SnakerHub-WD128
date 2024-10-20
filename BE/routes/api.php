<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController\SizeApiController;
use App\Http\Controllers\ApiController\ColorApiController;
use App\Http\Controllers\ApiController\UserApiController;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\api\CategoryController;

use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('sizes', SizeApiController::class);
Route::apiResource('colors', ColorApiController::class);
Route::apiResource('users', UserApiController::class);

$crud = [
    'categories' => CategoryController::class,
    'products' => ProductController::class,
    'orders' => OrderController::class,
];

foreach ($crud as $key => $controller) {
    Route::apiResource($key, $controller);
}

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
});

Route::prefix('shop')->group(function () {
    Route::get('/cart', [CartController::class, 'index']); // Lấy danh sách sản phẩm trong giỏ hàng
    Route::post('/cart/store', [CartController::class, 'store']); // Thêm sản phẩm vào giỏ hàng
    Route::post('/cart/update-quantity', [CartController::class, 'updateQuantity']); // Cập nhật số lượng sản phẩm
    Route::delete('/cart/{id}', [CartController::class, 'destroy']); // Xóa sản phẩm khỏi giỏ hàng
});