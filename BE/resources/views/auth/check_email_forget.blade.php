<h2>Xin chào {{$user->name}}</h2>
    <p>Email này để giúp bạn lấy lại mật khẩu</p>
    <p>Vui lòng click vào link dưới đây để đặt lại mật khẩu:</p>
    <p>Chú ý: Mã xác nhận chỉ có hiệu lực trong vòng 72h.</p>
    <p><a href="{{ route('resetPassword', ['userId' => $user->id]) }}">
    Đặt lại mật khẩu
</a> </p>