import axios from "axios";

export const axiosInstance= axios.create({
    baseURL:'https://todo-wdxu.vercel.app/api/v1',
    withCredentials:true
})