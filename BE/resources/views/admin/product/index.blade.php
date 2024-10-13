@if (session('success'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

<a href="{{route('products.create')}}">Thêm SP</a>



@foreach ($products as $product)
<p>
        {{$product->id}} |
        {{$product->name}} |
        <a name="sua" id="sua" class="btn btn-primary" href="{{route('products.edit',$product)}}" role="button">Sua</a> |

        <form action="{{route('products.destroy',$product)}}" method="post">
            @method('DELETE')
            @csrf

            <button type="submit" onclick="return confirm('Xác nhận xóa')">Xóa</button>
        </form>
    </p>
@endforeach
