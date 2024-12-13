<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;
class SizeApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::all();
        return response()->json($sizes);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $size = Size::find($id);

        if (!$size) {
            return response()->json(['message' => 'Size not found'], 404);
        }

        return response()->json($size);
    }
   
}
