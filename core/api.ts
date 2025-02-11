import axios, { type AxiosInstance, AxiosRequestConfig } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ENDPOINTS, API_URL } from "./config"

type EndpointKey = keyof typeof ENDPOINTS

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    const access = await AsyncStorage.getItem("access_token")
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refresh = await AsyncStorage.getItem("refresh_token")
        const response = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh })
        const newAccessToken = response.data.access
        await AsyncStorage.setItem("access_token", newAccessToken)
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        await AsyncStorage.removeItem("access_token")
        await AsyncStorage.removeItem("refresh_token")
        await AsyncStorage.setItem("is_authenticated", "false")
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

// Generic function to make API calls
const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: EndpointKey,
  data?: any,
  config?: AxiosRequestConfig
)
: Promise<T> =>
{
  const url = ENDPOINTS[endpoint]
  try {
    const response = await api[method](url, data, config)
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} ${url}:`, error)
    throw error
  }
}

export const login = (credentials: { username: string; password: string }) =>
  apiCall<{ access: string; refresh: string }>("post", "LOGIN", credentials)

export const register = (userData: any) => apiCall<any>("post", "REGISTER", userData)

export const getUserProfile = () => apiCall<any>("get", "USER_PROFILE")

export const updateUserProfile = (profileData: any) => apiCall<any>("put", "USER_PROFILE", profileData)

export const getPatients = () => apiCall<any[]>("get", "PATIENTS")

export const getDoctors = () => apiCall<any[]>("get", "DOCTORS")

export const getClinics = () => apiCall<any[]>("get", "CLINICS")

export const createReservation = (reservationData: any) => apiCall<any>("post", "RESERVATIONS", reservationData)

export const getPosts = () => apiCall<any[]>("get", "POSTS")

export const createPost = (postData: any) => apiCall<any>("post", "POSTS", postData)

// Add more specific API functions as needed

export default api

