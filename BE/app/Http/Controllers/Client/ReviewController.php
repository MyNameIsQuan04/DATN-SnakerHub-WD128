<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function getReviews($product_id)
{
    // kiểm tra xem sản phẩm có tồn tại không
    $product = Product::find($product_id);
    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    // Truy xuất các đánh giá cho sản phẩm bằng cách phân trang
    $reviews = Review::where('product_id', $product_id)
        ->with('user:id,name') // tải thông tin người dùng để hiển thị người đánh giá
        ->orderBy('created_at', 'desc') // sắp xếp theo đánh giá mới nhất
        ->paginate(10); // bạn có thể điều chỉnh số lượng đánh giá trên mỗi trang

    return response()->json(['product' => $product, 'reviews' => $reviews]);
}
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'order_id' => 'required|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        // Check if the order is completed
        $order = Order::find($request->order_id);

        if (!$order || $order->status !== 'completed' || $order->user_id !== Auth::id()) {
            return response()->json(['error' => 'Order not eligible for review'], 403);
        }

        // Check if user has already reviewed this product for this order
        $existingReview = Review::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->where('order_id', $request->order_id)
            ->first();

        if ($existingReview) {
            return response()->json(['error' => 'You have already reviewed this product'], 400);
        }

        // Create the review
        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'order_id' => $request->order_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['message' => 'Review updated successfully', 'review' => $review]);
    }

    public function destroy($id)
    {
        $review = Review::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
