<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully.'], 200);
    }

    /**
     * Reply to a comment.
     */
    public function reply(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'reply' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comment = Comment::findOrFail($id);

        // Check if the comment already has a reply from admin
        $existingReply = Comment::where('parent_id', $comment->id)
            ->where('is_admin_reply', true)
            ->first();

        if ($existingReply) {
            return response()->json([
                'message' => 'Bình luận này đã được trả lời bởi admin.'
            ], 403);
        }

        DB::beginTransaction();

        try {
            $reply = new Comment();
            $reply->user_id = auth()->id();
            $reply->product_id = $comment->product_id;
            $reply->order__item_id = $comment->order__item_id;
            $reply->content = $request->reply;
            $reply->star = 0; // Không tính số sao
            $reply->parent_id = $comment->id;
            $reply->is_admin_reply = true; // Đánh dấu là phản hồi của admin
            $reply->save();

            DB::commit();

            return response()->json([
                'message' => 'Reply added successfully.',
                'reply' => [
                    'id' => $reply->id,
                    'content' => $reply->content,
                    'created_at' => $reply->created_at,
                ],
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
