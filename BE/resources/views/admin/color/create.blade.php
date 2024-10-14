<div class="container">
  <h1>Add color</h1>
  <form action="{{route('color.store')}}" method="POST">
    @csrf
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" name="name" required>
    </div>
    <button type="submit" class="btn btn-primary">Add color</button>
    <a href="{{route('color.index')}}" class="btn btn-secondary ml-3">Cancel</a>
</form>
</div>