<div class="container">
    <h1>Users</h1>
    <a href="{{route('user.create')}}" class="btn btn-primary">Add User</a>

    @if (session('success'))
        <div class="alert alert-success">{{session('success')}}</div>
    @endif
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->type }}</td>
                    <td>{{ $user->phone_number }}</td>
                    <td>{{ $user->address }}</td>
                    <td>
                        <a href="{{ route('user.edit', $user->id)}}" class="btn btn-info">Edit</a>
                        <form action="{{route('user.destroy', $user->id)}}" method="POST" onsubmit="return confirm('Are you sure you want to delete this user?')">
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