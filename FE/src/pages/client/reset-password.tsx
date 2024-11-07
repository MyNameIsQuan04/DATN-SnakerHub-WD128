import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate(); // Thay vì useHistory

  useEffect(() => {
    // Lấy token và email từ URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");
    const emailFromUrl = params.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      setErrorMessage("Liên kết đặt lại mật khẩu không hợp lệ.");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [location]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    // Gửi request tới backend để reset mật khẩu
    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      if (response.ok) {
        alert("Mật khẩu đã được thay đổi thành công");
        navigate("/login"); // Điều hướng về trang đăng nhập
      } else {
        const data = await response.json();
        setErrorMessage(
          data.error || "Đặt lại mật khẩu không thành công. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2>Đặt lại mật khẩu</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleResetPassword}>Đặt lại mật khẩu</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
