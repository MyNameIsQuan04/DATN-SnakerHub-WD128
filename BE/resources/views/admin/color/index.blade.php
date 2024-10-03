<div class="container">
      <h1>Color</h1>
      <a href="{{route('admin.color.create')}}" class="btn btn-primary">Add color</a>
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
          @foreach ($colors as $color)
          <tr>
            <td>{{ $color->id }}</td>
            <td>{{ $color->name }}</td>
            <td>
              <a href="{{route('admin.color.edit', $color->id)}}" class="btn btn-warning">Edit</a>
              <form action="{{route('admin.color.destroy', $color->id)}}" method="POST" onsubmit="return confirm('Are you sure you want to delete this color?')">
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