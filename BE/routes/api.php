<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\AdminController\OrderController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

$crud = [
    'categories' => CategoryController::class,
    'products' => ProductController::class,
    'orders' => OrderController::class,

];

foreach ($crud as $key => $controller) {
    Route::apiResource($key, $controller);
}