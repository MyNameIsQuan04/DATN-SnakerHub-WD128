import api from "../../configs/axios";
import { Product } from "../../interfaces/Product";

const token = localStorage.getItem("access_token");

export const getProducts = async () => {
  try {
    const { data } = await api.get("products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number | string) => {
  try {
    const { data } = await api.get("products/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product: Product) => {
  try {
    const { data } = await api.post("products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Thành công");
    return data;
  } catch (error) {
    alert("Không thành công");
    console.log(error);
  }
};

export const updateProduct = async (formData: any, id: number) => {
  try {
    const { data } = await api.post(`products/${id}?_method=PUT`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Thành công");
    return data;
  } catch (error) {
    console.log("FormData contents:", formData);
    alert("Không thành công");
  }
};

export const removeProduct = async (id: number | string) => {
  try {
    const { data } = await api.delete(`products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
