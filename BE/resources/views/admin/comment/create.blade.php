<div class="container">
    <h1>Add comment</h1>
    <form action="{{route('comment.store')}}" method="POST">
        @csrf
        <div class="form-group">
            <label for="content">Content</label>
            <textarea class="form-control" id="content" name="content" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label for="product_id">Product ID</label>
            <input type="text" class="form-control" id="product_id" name="product_id" value="{{ $product->id }}">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>