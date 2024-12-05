import api from "../configs/axios";
import { Product } from "../interfaces/Product";

export const getProducts = async () => {
  try {
    const { data } = await api.get("products");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductsClients = async () => {
  try {
    const { data } = await api.get("client/products");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id: number | string) => {
  try {
    const { data } = await api.get("products/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product: Product) => {
  try {
    const { data } = await api.post("products", product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (formData: any, id: number) => {
  try {
    const { data } = await api.post(`products/${id}?_method=PUT`, formData);
    alert("Thành công");
    return data;
  } catch (error) {
    console.log("FormData contents:", formData);
    alert("Không thành công");
  }
};

export const removeProduct = async (id: number | string) => {
  try {
    const { data } = await api.delete(`products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
