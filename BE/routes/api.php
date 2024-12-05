<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\SlideController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\SizeApiController;
use App\Http\Controllers\api\UserApiController;
use App\Http\Controllers\api\VoucherController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\ColorApiController;
use App\Http\Controllers\api\DashboardController;
use App\Http\Controllers\Client\CommentController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\Client\OrderController as ApiMemberOrderController;
use App\Http\Controllers\Client\ProductController as ClientProductController;
use App\Http\Controllers\PaymentController;

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
Route::get('/products/category/{id}', [ClientProductController::class, 'filterByCategory']);
Route::get('dashboard/daily', [DashboardController::class, 'daily']);
Route::get('dashboard/monthly', [DashboardController::class, 'monthly']);
Route::get('dashboard', [DashboardController::class, 'index']);

Route::apiResource('client/orders', ApiMemberOrderController::class);
Route::put('client/return-order/{order}', [ApiMemberOrderController::class, 'returnOrder']);

Route::apiResource('client/products', ClientProductController::class);

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class, 'refresh']);
});
// Route để gửi yêu cầu quên mật khẩu (gửi email)
Route::post('forget-password', [AuthController::class, 'postForgetPass']);
// Route để đặt lại mật khẩu
Route::post('reset-password/', [AuthController::class, 'postResetPassword']);

Route::group(['middleware' => ['auth:api']],  function () {
    Route::get('/list', [CartController::class, 'index'])->name('cart.index');

    // Thêm sản phẩm vào giỏ hàng
    Route::post('/add', [CartController::class, 'store'])->name('cart.add');

    // Cập nhật giỏ hàng (ví dụ: cập nhật số lượng sản phẩm)
    Route::put('/update/{id}', [CartController::class, 'update'])->name('cart.update');

    // Xóa một sản phẩm khỏi giỏ hàng
    Route::delete('/destroy/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    Route::post('/update-quantity', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');

    // Hiển thị chi tiết một sản phẩm trong giỏ hàng (tùy chọn)
    Route::get('/item/{id}', [CartController::class, 'showCartItem'])->name('cart.showItem');

    Route::post('/validate-voucher', [OrderController::class, 'validateVoucher']);
    Route::post('/apply-voucher', [OrderController::class, 'applyVoucher']);
});

Route::middleware('auth:api')->group(function () {
    // Hiển thị danh sách người dùng (Admin chỉ có thể truy cập)
    Route::get('/users', [UserApiController::class, 'index'])->middleware('type:admin');

    // Hiển thị thông tin người dùng (cho cả Admin và User)
    Route::get('/users/{id}', [UserApiController::class, 'show'])->middleware('type:admin,user');

    // Cập nhật thông tin người dùng (cho cả Admin và User)
    Route::post('/users/{id}', [UserApiController::class, 'update'])->middleware('type:admin,user');

    // Xóa người dùng (Admin)
    Route::delete('/users/{id}', [UserApiController::class, 'destroy'])->middleware('type:admin');

    // Khóa tài khoản người dùng (Admin)
    Route::post('/users/{id}/lock', [UserApiController::class, 'lockAccount'])->middleware('type:admin');

    // Mở khóa tài khoản người dùng (Admin)
    Route::post('/users/{id}/unlock', [UserApiController::class, 'unlockAccount'])->middleware('type:admin');

    // Hiển thị thông tin của chính người dùng đã đăng nhập
    // Route::get('/profile', [UserApiController::class, 'profile']);

    // Cập nhật thông tin của chính người dùng đã đăng nhập
    // Route::put('/users/{id}', [UserApiController::class, 'updateProfile']);
});
Route::get('/vouchers', [VoucherController::class, 'index'])->name('voucher.index');
Route::post('/voucher', [VoucherController::class, 'store'])->name('voucher.store');
Route::put('/voucher/{id}', [VoucherController::class, 'update'])->name('voucher.update');
Route::delete('/voucher/{id}', [VoucherController::class, 'destroy'])->name('voucher.destroy');
//lọc sản phẩm
Route::get('/filter', [ClientProductController::class, 'filterProducts']);

Route::prefix('slides')->group(function () {
    Route::get('/', [SlideController::class, 'index']);  // Lấy danh sách slide
    Route::get('{id}', [SlideController::class, 'show']);  // Lấy thông tin slide cụ thể
    Route::post('/', [SlideController::class, 'store']);  // Tạo mới slide
    Route::put('{id}', [SlideController::class, 'update']);  // Cập nhật slide
    Route::delete('{id}', [SlideController::class, 'destroy']);  // Xóa slide
});

Route::get('/search', [ClientProductController::class, 'search']);

Route::post('/rate', [CommentController::class, 'store']);

Route::post('/vnpay-payment', [ApiMemberOrderController::class, 'vnpayPayment'])->name('api.vnpay.payment');
Route::get('/vnpay-return', [ApiMemberOrderController::class, 'vnpayReturn']);