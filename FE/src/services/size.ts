import api from "../configs/axios";
import { Size } from "../interfaces/Size";

export const getSizes = async () => {
  try {
    const { data } = await api.get("sizes");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSizeById = async (id: number | string) => {
  try {
    const { data } = await api.get(`sizes/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addSize = async (size: Size) => {
  try {
    const { data } = await api.post("sizes", size);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSize = async (size: Size, id: number) => {
  try {
    const { data } = await api.put(`sizes/${id}`, size);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const removeSize = async (id: number) => {
  try {
    const { data } = await api.delete(`sizes/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
