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
    // Làm mới token
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    // Lấy thông tin người dùng bằng token
    Route::get('user-info', [AuthController::class, 'getUserInfo'])->middleware('auth:api');
});

Route::middleware('auth:api')->prefix('cart')->group(function () {
    // Lấy danh sách các sản phẩm trong giỏ hàng
    Route::get('/', [CartController::class, 'index'])->name('cart.index');

    // Thêm sản phẩm vào giỏ hàng
    Route::post('/add', [CartController::class, 'store'])->name('cart.add');

    // Cập nhật giỏ hàng (ví dụ: cập nhật số lượng sản phẩm)
    Route::post('/update', [CartController::class, 'update'])->name('cart.update');

    // Xóa một sản phẩm khỏi giỏ hàng
    Route::delete('/destroy/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    Route::post('/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');

    // Hiển thị chi tiết một sản phẩm trong giỏ hàng (tùy chọn)
    Route::get('/item/{id}', [CartController::class, 'showCartItem'])->name('cart.showItem');
});