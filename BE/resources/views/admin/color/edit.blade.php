<div class="container">
    <h1>Edit color</h1>
    <form action="{{route('admin.color.update',$color->id)}}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name" value="{{ $color->name }}">
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{route('admin.color.index')}}" class="btn btn-secondary">Cancel</a>
    </form>
</div>