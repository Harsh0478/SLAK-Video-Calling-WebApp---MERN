import axios from "axios";

const BASE_URL =
  import.meta.MODE === "development"
    ? " https://slackbackend-delta.vercel.app/api"
    : "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
