@if (session('error'))
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ session('error') }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
@endif


<form action="{{route('categories.update',$category)}}" method="post">
    @method('PUT')
    @csrf
    <div class="mb-3">
        <label for="name-category" class="form-label">Name</label>
        <input type="text" class="form-control" name="name-category" id="name-category" aria-describedby="helpId"
            placeholder="Ten Category" value="{{$category->name}}"/>
    </div>

    <button type="submit">Cap nhat</button>
</form>