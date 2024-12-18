import axios from "axios";
const API_URL = "http://localhost:8000/api/voucher";
const token = localStorage.getItem("access_token");

export const fetchVouchers = async () => {
  const response = await axios.get(`http://localhost:8000/api/vouchers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addVoucher = async (voucher: any) => {
  const response = await axios.post(API_URL, voucher, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getVoucherById = async (id: string) => {
  const response = await axios.get(`http://localhost:8000/api/voucher/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateVoucher = async (id: string, voucher: any) => {
  const response = await axios.put(`${API_URL}/${id}`, voucher, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
