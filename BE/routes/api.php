<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController\SizeApiController;
use App\Http\Controllers\ApiController\ColorApiController;
use App\Http\Controllers\ApiController\UserApiController;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

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
