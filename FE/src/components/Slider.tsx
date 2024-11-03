import React from "react";
import Slider from "react-slick";

// Import CSS của slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị các dấu chấm điều hướng
    infinite: true, // Vòng lặp vô tận
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 1, // Số slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide cuộn khi điều hướng
    autoplay: true, // Tự động chạy slider
    autoplaySpeed: 2000, // Tốc độ chuyển slide tự động (ms)
  };

  return (
    <div className="w-full h-[600px]">
      <Slider {...settings}>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+1"
            alt="Slide 1"
            className="w-full h-[600px]  object-cover"
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+2"
            alt="Slide 2"
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/800x400?text=Slide+3"
            alt="Slide 3"
            className="w-full h-[600px]  object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
