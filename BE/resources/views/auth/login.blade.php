<form action="{{route('login')}}" method="POST">
    @csrf
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" name="email" required>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" name="password" required>
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
    <p class="mt-3">
        Bạn quên mật khẩu ? <a href="{{ route('forgetPass') }}">Click để lấy lại mật khẩu</a>
    </p>
    <a href="{{route('register')}}" class="float-left">Register</a>
</form>