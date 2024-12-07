import axios from "axios";
const API_URL = "http://localhost:8000/api/voucher";

export const fetchVouchers = async () => {
  const response = await axios.get(`http://localhost:8000/api/vouchers`);
  return response.data;
};

export const addVoucher = async (voucher: any) => {
  const response = await axios.post(API_URL, voucher);
  return response.data;
};

export const getVoucherById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/api/voucher/${id}`);
  return response.data;
};

export const updateVoucher = async (id: string, voucher: any) => {
  const response = await axios.put(`${API_URL}/${id}`, voucher);
  return response.data;
};
