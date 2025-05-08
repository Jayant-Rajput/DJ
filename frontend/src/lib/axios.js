import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",   //"https://hacc-2kvi.onrender.com/api"
  withCredentials: true,
});