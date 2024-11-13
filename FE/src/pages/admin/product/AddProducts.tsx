import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { ColorCT } from "../../../contexts/ColorContext";
import { SizeCT } from "../../../contexts/SizeContext";
import { ProductCT } from "../../../contexts/productContext";
import { Category } from "../../../interfaces/Category";
import { Color } from "../../../interfaces/Color";
import { Size } from "../../../interfaces/Size";

const AddProducts = () => {
  const { categories } = useContext(CategoryCT);
  const { colors } = useContext(ColorCT);
  const { sizes } = useContext(SizeCT);
  const { onAddProduct } = useContext(ProductCT);

  const initialValues = {
    name: "",
    price: 0,
    category_id: 0,
    description: "",
    short_description: "",
    thumbnail: null,
    galleries: [],
    variants: [
      {
        price: 0,
        size_id: "",
        color_id: "",
        stock: 0,
        sku: "",
        image: null,
      },
    ],
  };

  const onSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("category_id", values.category_id);
    formData.append("description", values.description);
    formData.append("short_description", values.short_description);

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    }

    values.galleries.forEach((image: File, index: number) => {
      formData.append(`galleries[${index}]`, image);
    });

    values.variants.forEach((variant: any, index: number) => {
      formData.append(`variants[${index}][price]`, variant.price.toString());
      formData.append(`variants[${index}][size_id]`, variant.size_id);
      formData.append(`variants[${index}][color_id]`, variant.color_id);
      formData.append(`variants[${index}][stock]`, variant.stock.toString());
      formData.append(`variants[${index}][sku]`, variant.sku);

      if (variant.image) {
        formData.append(`variants[${index}][image]`, variant.image);
      }
    });

    console.log(values);
    onAddProduct(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-auto">
      <div className="bg-white w-full max-w-4xl mx-auto p-8 rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Thêm Sản Phẩm Mới</h1>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, setFieldValue }) => (
            <Form className="p-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Thông tin sản phẩm</h2>

                {/* Tên sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Tên sản phẩm
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>

                {/* Giá sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Giá sản phẩm
                  </label>
                  <Field
                    name="price"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Nhập giá sản phẩm"
                  />
                </div>

                {/* Danh mục sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Danh mục sản phẩm
                  </label>
                  <Field
                    as="select"
                    name="category_id"
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Mô tả sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Mô tả sản phẩm
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Mô tả sản phẩm ngắn
                  </label>
                  <Field
                    as="textarea"
                    name="short_description"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>
                {/* Ảnh sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Ảnh sản phẩm
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={(e) =>
                      setFieldValue("thumbnail", e.target.files?.[0])
                    }
                  />
                </div>

                {/* Thư viện ảnh sản phẩm */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Thư viện ảnh sản phẩm
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border rounded-lg"
                    multiple
                    onChange={(e) =>
                      setFieldValue(
                        "galleries",
                        Array.from(e.target.files || [])
                      )
                    }
                  />
                </div>
              </div>

              {/* Biến thể sản phẩm */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Biến thể sản phẩm</h2>

                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <>
                      {values.variants.map((variant, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">
                            Biến thể {index + 1}
                          </h3>

                          {/* Giá biến thể */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Giá biến thể
                            </label>
                            <Field
                              name={`variants[${index}].price`}
                              type="number"
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          {/* Màu sắc */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Màu sắc
                            </label>
                            <Field
                              as="select"
                              name={`variants[${index}].color_id`}
                              className="w-full px-3 py-2 border rounded-lg"
                            >
                              <option value="">Chọn màu sắc</option>
                              {colors.map((color: Color) => (
                                <option key={color.id} value={color.id}>
                                  {color.name}
                                </option>
                              ))}
                            </Field>
                          </div>

                          {/* Kích cỡ */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Kích cỡ
                            </label>
                            <Field
                              as="select"
                              name={`variants[${index}].size_id`}
                              className="w-full px-3 py-2 border rounded-lg"
                            >
                              <option value="">Chọn kích cỡ</option>
                              {sizes.map((size: Size) => (
                                <option key={size.id} value={size.id}>
                                  {size.name}
                                </option>
                              ))}
                            </Field>
                          </div>

                          {/* Số lượng */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Số lượng
                            </label>
                            <Field
                              name={`variants[${index}].stock`}
                              type="number"
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>

                          {/* SKU */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              SKU
                            </label>
                            <Field
                              name={`variants[${index}].sku`}
                              type="text"
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="Nhập SKU"
                            />
                          </div>

                          {/* Ảnh biến thể */}
                          <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                              Ảnh biến thể
                            </label>
                            <input
                              type="file"
                              className="w-full px-3 py-2 border rounded-lg"
                              onChange={(e) =>
                                setFieldValue(
                                  `variants[${index}].image`,
                                  e.target.files?.[0]
                                )
                              }
                            />
                          </div>

                          <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                            onClick={() => remove(index)}
                          >
                            Xóa biến thể
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        onClick={() =>
                          push({
                            price: 0,
                            size_id: "",
                            color_id: "",
                            stock: 0,
                            sku: "",
                            image: null,
                          })
                        }
                      >
                        Thêm biến thể
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Thêm sản phẩm
                </button>
                <Link
                  to="/admin/product"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded ml-4"
                >
                  Hủy
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProducts;
