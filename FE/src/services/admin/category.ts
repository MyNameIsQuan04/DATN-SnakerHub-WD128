import api from "../../configs/axios";
import { formDataCategory } from "../../interfaces/Category";
const token = localStorage.getItem("access_token");

export const GetCategories = async () => {
  try {
    const { data } = await api.get("categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: number | string) => {
  try {
    const { data } = await api.get("categories/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (category: formDataCategory) => {
  try {
    const { data } = await api.post("categories", category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (
  category: formDataCategory,
  id: number | string
) => {
  try {
    const { data } = await api.put(`categories/${id}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (id: number | string) => {
  try {
    const { data } = await api.delete(`categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
