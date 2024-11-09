<h2>Quên Mật Khẩu</h2>
<p>Vui lòng nhập email đã đăng ký để đặt lại mật khẩu của bạn.</p>
<form action="{{ route('forgetPass') }}" method="POST">
    @csrf
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" class="form-control" required>
        @error('email') <small class="text-danger">{{ $message }}</small> @enderror
    </div>
    
    <button type="submit" class="btn btn-primary">Gửi Email Xác Nhận</button>
</form>