<div class="container">
    <h1>Edit size</h1>
    <form action="{{ route('size.update',$size->id)}}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $size->name }}">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('size.index') }}" class="btn btn-secondary ml-2">Cancel</a>
    </form>
</div>