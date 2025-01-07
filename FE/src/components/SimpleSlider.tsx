import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import instance from "../apis/api";

const SimpleSlider = () => {
  interface Slide {
    id: number;
    image: string;
    title: string;
  }

  const [slides, setSlides] = useState<Slide[]>([]);

  // Lấy danh sách slide từ API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await instance.get("/slides");
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  // Cấu hình slider
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
    adaptiveHeight: true,
  };

  return (
    <div className="w-full h-[600px] overflow-hidden mx-auto">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={`http://localhost:8000/storage/${slide.image}`}
              alt={slide.title}
              className="w-full h-[600px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
