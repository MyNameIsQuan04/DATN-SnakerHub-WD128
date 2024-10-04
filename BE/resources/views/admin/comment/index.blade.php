<div class="container">
    <h1>Comment</h1>
    <a href="{{route('comment.create')}}" class="btn btn-primary">Add comment</a>
    @if (session('success'))
    <div class="alert alert-success">{{session('success')}}</div>
    @endif
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Product ID</th>
                <th>Content</th>
                <th>Star</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($comments as $comment)
            <tr>
                <td>{{ $comment->id }}</td>
                <td>{{ $comment->user_id }}</td>
                <td>{{ $comment->product_id }}</td>
                <td>{{ $comment->content }}</td>
                <td>{{ $comment->star }}</td>
                <td>{{ $comment->created_at }}</td>
                <td>
                    <a href="{{route('comment.edit', $comment->id)}}" class="btn btn-warning">Edit</a>
                    <form action="{{route('comment.destroy', $comment->id)}}" method="POST" onsubmit="return confirm('Are you sure you want to delete this colmment?')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </form>
                     </td>
            </tr>
            @endforeach
         </tbody>
    </table>
</div>