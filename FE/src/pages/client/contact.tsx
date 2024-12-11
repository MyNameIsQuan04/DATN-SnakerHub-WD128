import React, { useEffect } from "react";

const Contact = () => {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Tạo script cho Tawk.to
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6758ff5549e2fd8dfef61749/1iepqaq7i";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
    // Thiết lập thông tin người dùng
    script.onload = () => {
      if (window.Tawk_API) {
        // Kết thúc cuộc trò chuyện hiện tại
        window.Tawk_API.endChat();

        // Sau đó, gắn thông tin người dùng mới
        if (user && user.name && user.email && user.id) {
          window.Tawk_API.setAttributes({
            name: user.name, // Tên khách hàng
            email: user.email, // Email khách hàng
            id: user.id, // ID khách hàng
          });

          // Bắt đầu cuộc trò chuyện mới
          window.Tawk_API.startChat();
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  return (
    <div>
      <h1>Liên hệ</h1>
      <p>Vui lòng sử dụng cửa sổ chat ở góc dưới để gửi câu hỏi của bạn.</p>
    </div>
  );
};

export default Contact;
