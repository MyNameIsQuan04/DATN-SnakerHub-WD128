import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import { CategoryCT } from "../../../contexts/CategoryContext";
import { ColorCT } from "../../../contexts/ColorContext";
import { SizeCT } from "../../../contexts/SizeContext";
import { ProductCT } from "../../../contexts/productContext";
import { Category } from "../../../interfaces/Category";
import { Color } from "../../../interfaces/Color";
import { Size } from "../../../interfaces/Size";
import { Gallery } from "../../../interfaces/Gallery";
import { getProductById } from "../../../services/admin/product";
import * as Yup from "yup";

const EditProduct = () => {
  const { categories } = useContext(CategoryCT);
  const { colors } = useContext(ColorCT);
  const { sizes } = useContext(SizeCT);
  const { onUpdateProduct } = useContext(ProductCT);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    null | number
  >(null);

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
                image: null,
              },
            ],
          });
        }
      })();
    }
  }, []);
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
  const validationSchema = Yup.object({
    name: Yup.string().required("Tên sản phẩm không được để trống"),
    price: Yup.number()
      .typeError("Giá sản phẩm phải là số")
      .positive("Giá sản phẩm phải lớn hơn 0")
      .required("Giá sản phẩm không được để trống"),
    category_id: Yup.string().required("Danh mục sản phẩm không được để trống"),
    variants: Yup.array()
      .of(
        Yup.object({
          size_id: Yup.string().required("Kích cỡ không được để trống"),
          color_id: Yup.string().required("Màu sắc không được để trống"),
          stock: Yup.number()
            .typeError("Số lượng phải là số")
            .integer("Số lượng phải là số nguyên")
            .min(0, "Số lượng không được âm")
            .required("Số lượng không được để trống"),
        })
      )
      .min(1, "Cần ít nhất một biến thể"),
  });
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
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, errors, touched }) => (
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
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
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
                {errors.price && touched.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
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
                {errors.category_id && touched.category_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category_id}
                  </p>
                )}
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
                    setFieldValue("galleries", Array.from(e.target.files || []))
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
                          {errors.variants?.[index]?.color_id &&
                            touched.variants?.[index]?.color_id && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.variants[index].color_id}
                              </p>
                            )}
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
                          {errors.variants?.[index]?.size_id &&
                            touched.variants?.[index]?.size_id && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.variants[index].size_id}
                              </p>
                            )}
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
                          {errors.variants?.[index]?.stock &&
                            touched.variants?.[index]?.stock && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.variants[index].stock}
                              </p>
                            )}
                        </div>

                        {/* SKU */}

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
