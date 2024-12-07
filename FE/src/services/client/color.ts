import api from "../../configs/axios";

export const getColors = async () => {
  try {
    const { data } = await api.get("colors");
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const getColorById = async (id: number | string) => {
//   try {
//     const { data } = await api.get(`client/colors/${id}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
