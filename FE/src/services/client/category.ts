import api from "../../configs/axios";

export const GetCategoriesClient = async () => {
  try {
    const { data } = await api.get("client/categories");
    return data;
  } catch (error) {
    console.log(error);
  }
};
