import axios from "axios";
import authHeader from "../Service/auth-header";
const BACKEND_BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({ baseURL: BACKEND_BASE_URL, headers: authHeader() });

export default axiosInstance;
