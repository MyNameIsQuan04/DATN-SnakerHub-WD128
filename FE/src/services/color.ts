import api from "../configs/axios";
import { Color } from "../interfaces/Color";

export const getColors = async () => {
  try {
    const { data } = await api.get("colors");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getColorById = async (id: number | string) => {
  try {
    const { data } = await api.get(`colors/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addColor = async (color: Color) => {
  try {
    const { data } = await api.post("colors", color);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateColor = async (color: Color, id: number) => {
  try {
    const { data } = await api.put(`colors/${id}`, color);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const removeColor = async (id: number) => {
  try {
    const { data } = await api.delete(`colors/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
