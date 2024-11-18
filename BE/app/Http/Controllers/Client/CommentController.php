<?php

namespace App\Http\Controllers\Client;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    
    public function store(Request $request)
    {
        $dataRate = $request->validate([
            'order__item_id' => 'required|exists:order__items,id',
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'star' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
        ]);

        $rate = Comment::query()->create($dataRate);

        return $rate;
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
}
