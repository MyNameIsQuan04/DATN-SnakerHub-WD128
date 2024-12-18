import api from "../../configs/axios";
import { Color } from "../../interfaces/Color";
const token = localStorage.getItem("access_token");

export const getColors = async () => {
  try {
    const { data } = await api.get("colors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getColorById = async (id: number | string) => {
  try {
    const { data } = await api.get(`colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addColor = async (color: Color) => {
  try {
    const { data } = await api.post("colors", color, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateColor = async (color: Color, id: number) => {
  try {
    const { data } = await api.put(`colors/${id}`, color, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const removeColor = async (id: number) => {
  try {
    const { data } = await api.delete(`colors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
