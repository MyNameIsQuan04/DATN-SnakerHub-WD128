<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminController\SizeController;
use App\Http\Controllers\AdminController\ColorController;
use App\Http\Controllers\AdminController\CommentController;
use App\Http\Controllers\AdminController\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController\OrderController;
use App\Http\Controllers\AdminController\ProductController;
use App\Http\Controllers\AdminController\CategoryController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('register', [AuthController::class,'showRegisterForm'])->name('register');
Route::post('register', [AuthController::class,'register'])->name('registerSubmit');

Route::get('login', [AuthController::class,'showLoginForm'])->name('login');
Route::post('login', [AuthController::class,'login']);

Route::get('logout', [AuthController::class,'logout'])->name('logout');

Route::middleware(['auth','type:admin'])->group(function(){
    // Route::get('admin/dashboard',[AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('admin/size',SizeController::class);
    Route::resource('admin/color', ColorController::class);
    Route::resource('admin/comment', CommentController::class);
    Route::resource('admin/user', UserController::class);
    $crud = [
        // 'categories' => CategoryController::class,
        // 'products' => ProductController::class,
        'orders' => OrderController::class,
        
    ];
    
    Route::prefix('admin')->group(function () use ($crud) {
        foreach ($crud as $key => $controller) {
            Route::resource($key, $controller);
        }
    
    });
});

