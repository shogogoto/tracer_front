import axios from "axios";
import { AxiosInstance } from "axios";
import path from "path";
export const BACKEND = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI
})

export default BACKEND
