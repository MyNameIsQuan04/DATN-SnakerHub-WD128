<div class="container">
    <h1>Edit size</h1>
    <form action="{{ route('admin.size.update',$size->id)}}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $size->name }}">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('admin.size.index') }}" class="btn btn-secondary ml-2">Cancel</a>
    </form>
</div>