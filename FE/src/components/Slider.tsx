import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
  // Cấu hình cho slider
  const settings = {
    infinite: true, // Vòng lặp vô tận
    speed: 1000, // Tăng tốc độ chuyển slide để mượt mà hơn
    slidesToShow: 1, // Số slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide cuộn khi điều hướng
    autoplay: true, // Tự động chạy slider
    autoplaySpeed: 3000, // Tốc độ chuyển slide tự động (ms)
    fade: true, // Hiệu ứng mờ khi chuyển slide
    cssEase: "linear", // Hiệu ứng chuyển động mượt mà
    adaptiveHeight: true, // Điều chỉnh chiều cao cho phù hợp với ảnh
  };

  return (
    <div className="w-full h-[600px] mt-[80px] mx-5">
      <Slider {...settings}>
        <div>
          <img
            src="https://i.pinimg.com/originals/df/10/36/df10364ff6c599bb59309472326b02d7.jpg" 
            alt="Slide 1"
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/474x/ad/fd/09/adfd0919c7041f9415884283accb66f7.jpg" 
            alt="Slide 2"
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.pinimg.com/originals/c5/d7/ad/c5d7ad69e83209167e809a3db42d1502.jpg" 
            alt="Slide 3"
            className="w-full h-[600px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
