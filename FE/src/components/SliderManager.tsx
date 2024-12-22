import React, { useEffect, useState } from "react";
import instance from "../apis/api";

const SliderManager = () => {
  const [slides, setSlides] = useState<
    { id: number; title: string; image: string; link: string }[]
  >([]);
  const [newSlide, setNewSlide] = useState<{
    title: string;
    image: File | null;
    link: string;
  }>({
    title: "",
    image: null,
    link: "",
  });
  const [editingSlide, setEditingSlide] = useState<{
    id: number;
    title: string;
    image: File | null;
    link: string;
  } | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await instance.get("/slides");
      setSlides(response.data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleAddSlide = async () => {
    const formData = new FormData();
    formData.append("title", newSlide.title);
    if (newSlide.image) formData.append("image", newSlide.image);
    formData.append("link", newSlide.link);

    try {
      await instance.post("/slides", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchSlides();
      setNewSlide({ title: "", image: null, link: "" });
    } catch (error) {
      console.error("Error adding slide:", error);
    }
  };

  const handleUpdateSlide = async () => {
    if (!editingSlide) return;

    const formData = new FormData();
    formData.append("title", editingSlide.title);
    if (editingSlide.image) formData.append("image", editingSlide.image);
    formData.append("link", editingSlide.link);

    try {
      await instance.put(`/slides/${editingSlide.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchSlides();
      setEditingSlide(null);
    } catch (error) {
      console.error("Error updating slide:", error);
    }
  };

  const handleDeleteSlide = async (id: number) => {
    try {
      await instance.delete(`/slides/${id}`);
      fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Quản lý Slide</h1>

      {/* Thêm slide */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Thêm mới Slide</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên"
            value={newSlide.title}
            onChange={(e) =>
              setNewSlide({ ...newSlide, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewSlide({
                ...newSlide,
                image: e.target.files ? e.target.files[0] : null,
              })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Link"
            value={newSlide.link}
            onChange={(e) => setNewSlide({ ...newSlide, link: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddSlide}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Thêm Slide
          </button>
        </div>
      </div>

      {/* Danh sách slide */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Danh sách Slide</h2>
        <div className="space-y-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:8000/storage/${slide.image}`}
                  alt={slide.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{slide.title}</h3>
                  <p className="text-sm text-gray-600">{slide.link}</p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingSlide({ ...slide, image: null })}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteSlide(slide.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sửa slide */}
      {editingSlide && (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Sửa</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={editingSlide.title}
              onChange={(e) =>
                setEditingSlide({ ...editingSlide, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) =>
                setEditingSlide({
                  ...editingSlide,
                  image: e.target.files ? e.target.files[0] : null,
                })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Link"
              value={editingSlide.link}
              onChange={(e) =>
                setEditingSlide({ ...editingSlide, link: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateSlide}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              Cập nhật
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderManager;
