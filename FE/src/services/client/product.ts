import api from "../../configs/axios";

export const getProductsClients = async () => {
  try {
    const { data } = await api.get("client/products");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductByIdClient = async (id: number | string) => {
  try {
    const { data } = await api.get("client/products/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
