<?php

namespace App\Http\Controllers\Client;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product_Variant;

class CommentController extends Controller
{

    public function store(Request $request)
    {

        $dataRate = $request->validate([
            'order__item_id' => 'required|exists:order__items,id',
            'user_id' => 'required|exists:users,id',
            'product__variant_id' => 'required|exists:product__variants,id',
            'star' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
        ]);

        $product_id = Product_Variant::where('id', $dataRate['product__variant_id'])->first()->product_id;

        $existingRate = Comment::where('order__item_id', $dataRate['order__item_id'])
            ->where('user_id', $dataRate['user_id'])
            ->where('product_id', $product_id)
            ->first();

        if ($existingRate) {
            return response()->json([
                'message' => 'Bạn đã đánh giá sản phẩm này cho đơn hàng này rồi.',
                'disable' => false,
            ], 400);
        }

        $rate = Comment::create([
            'order__item_id' => $dataRate['order__item_id'],
            'user_id' => $dataRate['user_id'],
            'product_id' => $product_id,
            'star' => $dataRate['star'],
            'content' => $dataRate['content'],
        ]);

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
