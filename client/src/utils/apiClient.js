import { HOST } from "../constant/constant";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: HOST
})

export default axiosInstance;