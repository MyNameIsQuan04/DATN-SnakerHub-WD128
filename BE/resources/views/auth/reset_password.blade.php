<h1>Đặt lại mật khẩu</h1>
<form action="{{ route('resetPassword', ['userId' => $user->id]) }}" method="POST">
    @csrf
    <label for="password">Mật khẩu mới:</label>
    <input type="password" name="password" required></br>

    <label for="password_confirmation">Xác nhận mật khẩu:</label>
    <input type="password" name="password_confirmation" required></br>

    <button type="submit">Đặt lại mật khẩu</button>
</form>