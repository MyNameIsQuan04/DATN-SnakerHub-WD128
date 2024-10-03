<div class="container">
    <h1>Edit comment</h1>
    <form method="POST" action="{{route('admin.comment.update', $comment->id)}}" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="content">Content</label>
            <textarea class="form-control" id="content" name="content" rows="5">{{$comment->content}}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>