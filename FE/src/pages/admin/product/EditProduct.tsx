import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { ColorCT } from "../../../contexts/ColorContext";
import { SizeCT } from "../../../contexts/SizeContext";
import { ProductCT } from "../../../contexts/ProductContext";
import { Category } from "../../../interfaces/Category";
import { Color } from "../../../interfaces/Color";
import { Size } from "../../../interfaces/Size";
import { getProductById } from "../../../services/product";
import { Gallery } from "../../../interfaces/Gallery";

const EditProduct = () => {
  const { categories } = useContext(CategoryCT);
  const { colors } = useContext(ColorCT);
  const { sizes } = useContext(SizeCT);
  const { onUpdateProduct } = useContext(ProductCT);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<null | number>(null);
  

  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    price: 0,
    category_id: 0,
    description: "",
    short_description: "",
    thumbnail: "",
    galleries: [
      {
        id: "",
        image_path: "",
      },
    ],
    variants: [
      {
        id: 0,
        price: 0,
        size_id: "",
        color_id: "",
        stock: 0,
        sku: "",
        image: "",
      },
    ],
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const product = await getProductById(id);
        console.log(product);
        if (product) {
          setInitialValues({
            name: product.name,
            price: product.price,
            category_id: product.category_id,
            description: product.description,
            short_description: product.short_description,
            thumbnail: product.thumbnail,
            galleries: product.galleries || [
              {
                id: "",
                image_path: null,
              },
            ],
            variants: product.product_variants || [
              {
                id: 0,
                price: 0,
                size_id: "",
                color_id: "",
                stock: 0,
                sku: "",
                image: null,
              },
            ],
          });
        }
      })();
    }
  }, [id]);
  const checkFormData = (formData: FormData) => {
    for (let pair of formData.entries()) {
      const key = pair[0];
      const value = pair[1];

      if (value instanceof File) {
        console.log(
          `${key}: ${value.name}, ${value.size} bytes, ${value.type}`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    console.log(values);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("category_id", values.category_id);
    formData.append("description", values.description);
    formData.append("short_description", values.short_description);

    if (values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values.galleries.forEach((gallery: any, index: number) => {
      if (gallery.image_path instanceof File) {
        formData.append(`galleries[${index}][id]`, gallery.id.toString());
        formData.append(`galleries[${index}][image]`, gallery.image_path);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values.variants.forEach((variant: any, index: number) => {
      if (variant.id) {
        formData.append(`variants[${index}][id]`, variant.id);
      }
      console.log(variant.id);
      formData.append(`variants[${index}][price]`, variant.price.toString());
      formData.append(`variants[${index}][size_id]`, variant.size_id);
      formData.append(`variants[${index}][color_id]`, variant.color_id);
      formData.append(`variants[${index}][stock]`, variant.stock.toString());
      formData.append(`variants[${index}][sku]`, variant.sku);

      if (variant.image instanceof File) {
        formData.append(`variants[${index}][image]`, variant.image);
      }
    });

    // Kiểm tra FormData trước khi gửi
    checkFormData(formData);

    // Gửi dữ liệu lên server
    onUpdateProduct(formData, id);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Sửa Sản Phẩm</h1>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
      >
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
              {values.galleries.map((gallery, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-gray-700 font-bold mb-2">
                    Thư viện ảnh sản phẩm
                  </label>

                  {/* Hiển thị ảnh cũ nếu có */}
                  {gallery.image_path && (
                    <div className="mb-2">
                      <img
                        src={gallery.image_path} // Sử dụng URL ảnh từ DB
                        alt={`Gallery Image ${index}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Input để chọn ảnh mới */}
                  <input
                    type="file"
                    className="w-full px-3 py-2 border rounded-lg"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        const newGalleries = [...values.galleries];
                        newGalleries[index] = {
                          ...newGalleries[index],
                          image_path: file, // Ghi đè bằng tệp tin
                        };
                        setFieldValue("galleries", newGalleries);
                      }
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mt-4"
                onClick={() => {
                  const newGalleries = [
                    ...values.galleries,
                    { id: "", image_path: null }, // Thêm ảnh trống
                  ];
                  setFieldValue("galleries", newGalleries);
                }}
              >
                Thêm ảnh mới
              </button>
            </div>

            {/* Biến thể sản phẩm */}
            <div className="mb-8 bg-gray-100">
              <h2 className="text-2xl font-bold mb-4">Biến thể sản phẩm</h2>

              <FieldArray name="variants">
                {({ push, remove }) => (
                  <>
                    {values.variants.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="mb-4 border p-4 rounded-lg cursor-pointer hover:shadow-lg"
                        onClick={() =>
                          setSelectedVariantIndex(
                            index === selectedVariantIndex ? null : index
                          )
                        }
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg mb-2">
                            Biến thể {index + 1}
                          </h3>
                          {/* Hiển thị hình ảnh biến thể */}
                          {variant.image && (
                            <img
                              src={
                                typeof variant.image === "string"
                                  ? variant.image
                                  : URL.createObjectURL(variant.image)
                              }
                              alt={`Variant ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </div>

                        {/* Chỉ hiển thị form nếu thẻ card được chọn */}
                        {selectedVariantIndex === index && (
                          <div className="mt-4">
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
                                {colors.map((color) => (
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
                                {sizes.map((size) => (
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
                                accept="image/*"
                                onChange={(e) =>
                                  setFieldValue(
                                    `variants[${index}].image`,
                                    e.target.files?.[0]
                                  )
                                }
                              />
                              {variant.image && (
                                <div className="mt-2">
                                  <img
                                    src={
                                      typeof variant.image === "string"
                                        ? variant.image
                                        : URL.createObjectURL(variant.image)
                                    }
                                    alt="Ảnh đã lưu"
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                              onClick={() => remove(index)}
                            >
                              Xóa biến thể
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      onClick={() =>
                        push({
                          id: 0,
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
                Sửa sản phẩm
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
  );
};

export default EditProduct;
