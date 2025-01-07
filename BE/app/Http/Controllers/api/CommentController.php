<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $comments = Comment::with(['user', 'product'])
            ->when($request->has('product_id'), function ($query) use ($request) {
                $query->where('product_id', $request->product_id);
            })
            ->paginate(10);

        return response()->json($comments, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully.'], 200);
    }

    public function reply(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'reply' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comment = Comment::findOrFail($id);

        // Check if the comment already has a reply
        $existingReply = Comment::where('parent_id', $comment->id)->first();
        if ($existingReply) {
            return response()->json([
                'message' => 'Bình luận này đã được trả lời'
            ], 403);
        }


        // Reply logic
        // $reply = new Comment();
        $replyData = [
        'user_id' => auth()->id(), // Lấy ID của admin (hoặc người dùng hiện tại)
        'product_id' => $comment->product_id, // Gắn cùng sản phẩm
        'order_item_id' => $comment->order_item_id, // Gắn cùng order item nếu cần
        'content' => $request->reply, // Nội dung trả lời
        'star' => null, // Không gắn số sao cho trả lời
        'parent_id' => $comment->id, // Gắn ID của bình luận được trả lời
          ];
        $reply = Comment::create($replyData);


        return response()->json(['message' => 'Reply added successfully.', 'reply' => $reply], 201);
    }
    
//     public function statistics($productId)
// {
//     // Lấy dữ liệu từ bảng comments theo product_id
//     $statistics = Comment::where('product_id', $productId)
//         ->selectRaw('AVG(star) as average_star, COUNT(*) as total_reviews')
//         ->first();

//     // Trả về dữ liệu thống kê
//     return response()->json([
//         'product_id' => $productId,
//         'average_star' => round($statistics->average_star, 1), // Làm tròn số sao
//         'total_reviews' => $statistics->total_reviews,
//     ], 200);
// }
}
