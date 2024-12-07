import api from "../../configs/axios";

export const GetCategoriesClient = async () => {
  try {
    const { data } = await api.get("categories");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByIdClient = async (id: number | string) => {
  try {
    const { data } = await api.get("categories/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
