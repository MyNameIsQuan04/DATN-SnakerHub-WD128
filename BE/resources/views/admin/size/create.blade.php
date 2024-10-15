<div class="container">
    <h1>Add Size</h1>
    <form action="{{route('size.store')}}" method="POST">
        @csrf
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Create size</button>
    </form>
</div>