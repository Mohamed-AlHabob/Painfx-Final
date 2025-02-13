import axios, { type AxiosInstance, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINTS, API_URL } from "./config";
import { addToQueue } from "./utils/requestQueue";
import { getNetworkStatus } from "./utils/network";


type EndpointKey = keyof typeof ENDPOINTS;

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const access = await AsyncStorage.getItem("access_token");
    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = await AsyncStorage.getItem("refresh_token");
        const response = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh });
        const newAccessToken = response.data.access;
        await AsyncStorage.setItem("access_token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        await AsyncStorage.setItem("is_authenticated", "false");
        console.error("Token refresh failed. Redirecting to login...");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: EndpointKey,
  data?: any,
  config?: AxiosRequestConfig & { params?: Record<string, string | number> }
): Promise<T> => {
  let url = ENDPOINTS[endpoint];

  // Replace placeholders in the URL with dynamic values
  if (config?.params) {
    Object.keys(config.params).forEach((key) => {
      url = url.replace(`{${key}}`, config.params![key].toString());
    });
  }

  const request = async () => {
    const response = await api[method](url, data, config);
    return response.data;
  };

  try {
    if (!getNetworkStatus()) {
      // Queue the request if offline
      addToQueue(request);
      throw new Error("Offline: Request queued for later retry.");
    }
    return await request();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        console.error("Network Error: Please check your internet connection.");
        addToQueue(request); // Queue the request if there's a network error
      } else {
        console.error(`Error in ${method.toUpperCase()} ${url}:`, error.response?.data || error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const login = (credentials: { username: string; password: string }) =>
  apiCall<{ access: string; refresh: string }>("post", "LOGIN", credentials);

export const register = (userData: any) => apiCall<any>("post", "USER", userData);

export const getUserProfile = () => apiCall<any>("get", "USER_PROFILE");

export const updateUserProfile = (profileData: any) => apiCall<any>("put", "USER_PROFILE", profileData);

export const createReservation = (reservationData: any) => apiCall<any>("post", "RESERVATIONS", reservationData);

export const getPosts = () => apiCall<any[]>("get", "POSTS");

export const getPost = (postId: string) => apiCall<any>("get", "POST_DETAIL", null, { params: { id: postId } });

export const createPost = (postData: FormData) => apiCall<any>("post", "POSTS", postData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const incrementPostViewCount = (postId: string) =>
  apiCall<any>("post", "POST_INCREMENT_VIEW_COUNT", null, { params: { id: postId } });

export const addTagsToPost = (postId: string, tags: string[]) =>
  apiCall<any>("post", "POST_ADD_TAGS", { tags }, { params: { id: postId } });

export const getPostLikes = (postId: string) =>
  apiCall<any[]>("get", "POST_LIKES", null, { params: { id: postId } });

export const getPostComments = (postId: string) =>
  apiCall<any[]>("get", "POST_COMMENTS", null, { params: { id: postId } });

export const createComment = (postId: string, text: string) =>
  apiCall<any>("post", "COMMENTS", { post: postId, text });

export const replyToComment = (commentId: string, postId: string, text: string) =>
  apiCall<any>("post", "COMMENT_REPLY", { post: postId, text }, { params: { id: commentId } });

export const updateComment = (commentId: string, text: string) =>
  apiCall<any>("put", "COMMENT_DETAIL", { text }, { params: { id: commentId } });

export const deleteComment = (commentId: string) => apiCall<any>("delete", "COMMENT_DETAIL", null, { params: { id: commentId } });

export const likePost = (postId: string) => apiCall<any>("post", "LIKES", { post: postId });

export const unlikePost = (likeId: string) =>
  apiCall<any>("post", "LIKE_UNLIKE", null, { params: { id: likeId } });


export const getUsers = () => apiCall<any[]>("get", "USER");

export const getUserById = (userId: string) =>
  apiCall<any>("get", "USER", null, { params: { id: userId } });

export const updateUser = (userId: string, userData: any) =>
  apiCall<any>("put", "USER", userData, { params: { id: userId } });

export const deleteUser = (userId: string) =>
  apiCall<any>("delete", "USER", null, { params: { id: userId } });

export const getDoctors = () => apiCall<any[]>("get", "DOCTORS");

export const getDoctorById = (doctorId: string) =>
  apiCall<any>("get", "DOCTORS", null, { params: { id: doctorId } });

export const updateDoctor = (doctorId: string, doctorData: any) =>
  apiCall<any>("put", "DOCTORS", doctorData, { params: { id: doctorId } });

export const deleteDoctor = (doctorId: string) =>
  apiCall<any>("delete", "DOCTORS", null, { params: { id: doctorId } });

export const getClinics = () => apiCall<any[]>("get", "CLINICS");

export const getClinicById = (clinicId: string) =>
  apiCall<any>("get", "CLINICS_DETAIL", null, { params: { id: clinicId } });

export const updateClinic = (clinicId: string, clinicData: any) =>
  apiCall<any>("put", "CLINICS_DETAIL", clinicData, { params: { id: clinicId } });

export const deleteClinic = (clinicId: string) =>
  apiCall<any>("delete", "CLINICS_DETAIL", null, { params: { id: clinicId } });

export const getPatients = () => apiCall<any[]>("get", "PATIENTS");

export const getPatientById = (patientId: string) =>
  apiCall<any>("get", "PATIENTS_DETAIL", null, { params: { id: patientId } });

export const updatePatient = (patientId: string, patientData: any) =>
  apiCall<any>("put", "PATIENTS_DETAIL", patientData, { params: { id: patientId } });

export const deletePatient = (patientId: string) =>
  apiCall<any>("delete", "PATIENTS_DETAIL", null, { params: { id: patientId } });

export const getReviews = () => apiCall<any[]>("get", "REVIEWS");

export const getReviewById = (reviewId: string) =>
  apiCall<any>("get", "REVIEWS", null, { params: { id: reviewId } });

export const createReview = (reviewData: any) =>
  apiCall<any>("post", "REVIEWS", reviewData);

export const updateReview = (reviewId: string, reviewData: any) =>
  apiCall<any>("put", "REVIEWS", reviewData, { params: { id: reviewId } });

export const deleteReview = (reviewId: string) =>
  apiCall<any>("delete", "REVIEWS", null, { params: { id: reviewId } });


export default api;