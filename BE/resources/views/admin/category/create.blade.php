@if (session('error'))
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ session('error') }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
@endif


<form action="{{route('categories.store')}}" method="post">
    @csrf
    <div class="mb-3">
        <label for="name-category" class="form-label">Name</label>
        <input type="text" class="form-control" name="name" id="name-category" aria-describedby="helpId"
            placeholder="Ten Category" />
    </div>

    <button type="submit">Them moi</button>
</form>