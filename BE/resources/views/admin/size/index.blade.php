<div class="container">
<h1>Size</h1>
<a href="{{route('size.create')}}" class="btn btn-primary">Add size</a>
@if (session('success'))
<div class="alert alert-success">{{session('success')}}</div>
@endif
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($sizes as $size)
        <tr>
            <td>{{ $size->id }}</td>
            <td>{{ $size->name }}</td>
            <td>
                <a href="{{route('size.edit', $size->id)}}" class="btn btn-warning">Edit</a>
                <form action="{{route('size.destroy', $size->id)}}" method="POST" onsubmit="return confirm('Are you sure you want to delete this size?')">
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