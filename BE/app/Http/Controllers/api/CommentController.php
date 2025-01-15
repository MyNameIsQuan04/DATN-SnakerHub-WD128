<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Mail\ReplyNotificationMail;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\History;
use App\Services\HistoryService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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

        HistoryService::log('comments', $comment->id, 'delete', $comment, []);
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
            'user_id' => Auth::id(), // Lấy ID của admin (hoặc người dùng hiện tại)
            'product_id' => $comment->product_id, // Gắn cùng sản phẩm
            'order__item_id' => $comment->order__item_id, // Gắn cùng order item nếu cần
            'content' => $request->reply, // Nội dung trả lời
            'star' => 0, // Không gắn số sao cho trả lời
            'parent_id' => $comment->id, // Gắn ID của bình luận được trả lời
        ];

        $reply = Comment::create($replyData);
        // $isReply = Comment::where('id', $id)->update
        HistoryService::log('comments', $reply->id, 'reply', [], $reply);

        // Gửi email cho khách hàng
        $customerEmail = $comment->user->email; // Email khách hàng
        $customerName = $comment->user->name; // Tên khách hàng
        Mail::to($customerEmail)->send(new ReplyNotificationMail($request->reply, $customerName));

        return response()->json(['message' => 'Reply added successfully.', 'reply' => $reply], 201);
    }
}
