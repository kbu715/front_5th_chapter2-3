import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "https://dummyjson.com" : "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const message = error.response?.data?.message || "요청 처리 중 오류가 발생했습니다"
    console.error("API 오류:", message)
    return Promise.reject(error)
  },
)
