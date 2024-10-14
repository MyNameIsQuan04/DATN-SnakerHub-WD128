import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/DATN/DATN-SnakerHub-WD128/BE/public",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
