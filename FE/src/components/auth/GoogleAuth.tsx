import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const CLIENT_ID =
  "573359519849-634qpdnslepq040cq0nbs4ug80tn8pup.apps.googleusercontent.com"; // Thay bằng Google Client ID của bạn

const GoogleAuth: React.FC = () => {
  // Xử lý thành công khi Google trả về thông tin
  const handleSuccess = async (credentialResponse: any) => {
    console.log("Google response:", credentialResponse);

    if (credentialResponse.credential) {
      try {
        // Gửi token từ Google đến backend
        const response = await axios.post(
          "http://localhost:8000/api/auth/google",
          {
            token: credentialResponse.credential,
          }
        );

        const { access_token } = response.data;

        // Lưu JWT token vào localStorage
        localStorage.setItem("access_token", access_token);

        console.log("Login successful! Token saved:", access_token);
      } catch (error) {
        console.error("Error during backend authentication:", error);
        alert("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } else {
      console.error("No credential received from Google.");
    }
  };

  // Xử lý khi đăng nhập thất bại
  const handleError = () => {
    console.error("Google login failed.");
    alert("Đăng nhập Google thất bại. Vui lòng thử lại.");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
