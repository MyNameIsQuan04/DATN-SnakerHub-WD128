import React from "react";


const Contact = () => {
  return (
    <div className="flex mt-[80px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863931182067!2d105.74468687503169!3d21.038129780613506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1sen!2s!4v1730646154191!5m2!1sen!2s"
        width="600"
        height="450"
        className="w-3/5 h-[350px]"
        loading="lazy"
      ></iframe>
      <div className="px-[100px] w-2/5 h-[350px] flex flex-col justify-center  bg-gray-100">
        <div className="flex items-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-9 mr-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold">SneakerHub.vn</span>
            <span className="text-gray-500">Trịnh Văn Bô</span>
          </div>
        </div>
        <hr />
        <div className="flex items-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-9 mr-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold">HOTLINE</span>
            <span className="text-gray-500">SDT: 099999999</span>
          </div>
        </div>
        <hr />
        <div className="flex items-center my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-9 mr-[20px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold">Thời gian làm việc</span>
            <span className="text-gray-500">08:00 - 21:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
