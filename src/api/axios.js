import axios from "axios";
const API_BASE_URL =  "http://localhost:5050"

export default axios.create({
    baseURL: API_BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});