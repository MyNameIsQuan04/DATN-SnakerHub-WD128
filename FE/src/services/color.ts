import api from "../configs/axios";

export const getColors = async () => {
  try {
    const { data } = await api.get("colors");
    return data;
  } catch (error) {
    console.log(error);
  }
};
