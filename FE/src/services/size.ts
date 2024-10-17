import api from "../configs/axios";

export const getSizes = async () => {
  try {
    const { data } = await api.get("sizes");
    return data;
  } catch (error) {
    console.log(error);
  }
};
