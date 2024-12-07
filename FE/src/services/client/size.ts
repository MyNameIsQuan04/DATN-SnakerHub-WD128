import api from "../../configs/axios";

export const getSizes = async () => {
  try {
    const { data } = await api.get("sizes");
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const getSizeById = async (id: number | string) => {
//   try {
//     const { data } = await api.get(`client/sizes/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
