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

        // Reply logic
        $reply = $comment->replicate();
        $reply->content = $request->reply;
        $reply->save();

        return response()->json(['message' => 'Reply added successfully.', 'reply' => $reply], 201);
    }
}
