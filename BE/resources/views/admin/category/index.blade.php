@if (session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif


<a name="create" id="create" class="btn btn-primary" href="{{route('categories.create')}}" role="button">Them moi</a>


@foreach ($categories as $key)
    <p>
        {{$key->id}} |
        {{$key->name}} |
        <a name="sua" id="sua" class="btn btn-primary" href="{{route('categories.edit',$key)}}" role="button">Sua</a> |

        <form action="{{route('categories.destroy',$key)}}" method="post">
            @method('DELETE')
            @csrf

            <button type="submit" onclick="return confirm('Xác nhận xóa')">Xóa</button>
        </form>
    </p>
@endforeach