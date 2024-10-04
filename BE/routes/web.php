<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminController\SizeController;
use App\Http\Controllers\AdminController\ColorController;
use App\Http\Controllers\AdminController\CommentController;
use App\Http\Controllers\AdminController\UserController;
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
Route::resource('admin/size',SizeController::class);
Route::resource('admin/color', ColorController::class);
Route::resource('admin/comment', CommentController::class);
Route::resource('admin/user', UserController::class);