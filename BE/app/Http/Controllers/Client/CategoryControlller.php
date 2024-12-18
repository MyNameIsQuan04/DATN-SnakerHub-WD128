<?php

namespace App\Http\Controllers\Client;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryControlller extends Controller
{
    public function index()
    {
        $categories = Category::orderByDesc('id')->get();
        return $categories;
    }
}
