import axios from "axios";
const API_URL = "http://localhost:8000/api/voucher";

export const fetchVouchersClient = async () => {
  const response = await axios.get(`http://localhost:8000/api/client/vouchers`);
  return response.data;
};

export const addVoucherClient = async (voucher: any) => {
  const response = await axios.post(API_URL, voucher);
  return response.data;
};

export const getVoucherByIdClient = async (id: string) => {
  const response = await axios.get(
    `http://localhost:8000/api/client/voucher/${id}`
  );
  return response.data;
};

export const updateVoucherClient = async (id: string, voucher: any) => {
  const response = await axios.put(`${API_URL}/${id}`, voucher);
  return response.data;
};
