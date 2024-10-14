import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Định nghĩa schema validation với Zod
const schema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
});

type ProductFormValues = z.infer<typeof schema>;

const AddSize = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await axios.get(
        "http://datn.test/DATN-SnakerHub-WD128/BE/sanctum/csrf-cookie",
        {
          withCredentials: true,
        }
      );

      const response = await axios.post(
        "http://datn.test/DATN-SnakerHub-WD128/BE/public/admin/categories",
        data, // Gửi data dưới dạng JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Sản phẩm đã được thêm thành công:", response.data);
      reset();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Thêm Sản Phẩm Mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên sản phẩm:</label>
          <input
            type="text"
            {...register("name")}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá:</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
};

export default AddSize;
