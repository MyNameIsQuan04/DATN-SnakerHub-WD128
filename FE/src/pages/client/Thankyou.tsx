import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
      <h1 className="text-3xl font-bold text-orange-600">
        Cảm ơn bạn đã mua hàng!
      </h1>
      <p className="mt-4 text-lg text-orange-600">
        Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        Trở về trang chủ
      </Link>
    </div>
  );
};

export default ThankYou;
