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
        addToQueue(request);
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

export const getPosts = () => apiCall<any[]>("get", "POSTS");

export const getPostById = (postId: string) =>
  apiCall<any>("get", "POST_DETAIL", null, { params: { id: postId } });

export const createPost = (postData: FormData) => apiCall<any>("post", "POSTS", postData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const updatePost = (postId: string, postData: any) =>
  apiCall<any>("put", "POST_DETAIL", postData, { params: { id: postId } });

export const deletePost = (postId: string) =>
  apiCall<any>("delete", "POST_DETAIL", null, { params: { id: postId } });

export const incrementPostViewCount = (postId: string) =>
  apiCall<any>("post", "POST_INCREMENT_VIEW_COUNT", null, { params: { id: postId } });

export const addTagsToPost = (postId: string, tags: string[]) =>
  apiCall<any>("post", "POST_ADD_TAGS", { tags }, { params: { id: postId } });

export const getPostLikes = (postId: string) =>
  apiCall<any[]>("get", "POST_LIKES", null, { params: { id: postId } });

export const getPostComments = (postId: string) =>
  apiCall<any[]>("get", "POST_COMMENTS", null, { params: { id: postId } });

export const getLikes = () => apiCall<any[]>("get", "LIKES");

export const getLikeById = (likeId: string) =>
  apiCall<any>("get", "LIKES", null, { params: { id: likeId } });

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

export const getReservations = () => apiCall<any[]>("get", "RESERVATIONS");

export const getReservationById = (reservationId: string) =>
  apiCall<any>("get", "RESERVATIONS", null, { params: { id: reservationId } });

export const createReservation = (reservationData: any) => apiCall<any>("post", "RESERVATIONS", reservationData);

export const updateReservation = (reservationId: string, reservationData: any) =>
  apiCall<any>("put", "RESERVATIONS", reservationData, { params: { id: reservationId } });

export const deleteReservation = (reservationId: string) =>
  apiCall<any>("delete", "RESERVATIONS", null, { params: { id: reservationId } });

export const approveReservation = (reservationId: string) =>
  apiCall<any>("post", "RESERVATIONS", null, { params: { id: reservationId, action: 'approve' } });

export const rejectReservation = (reservationId: string, reason: string) =>
  apiCall<any>("post", "RESERVATIONS", { reason }, { params: { id: reservationId, action: 'reject' } });

export const getComments = () => apiCall<any[]>("get", "COMMENTS");

export const getCommentById = (commentId: string) =>
  apiCall<any>("get", "COMMENT_DETAIL", null, { params: { id: commentId } });

export const createComment = (commentData: any) => apiCall<any>("post", "COMMENTS", commentData);

export const updateComment = (commentId: string, commentData: any) =>
  apiCall<any>("put", "COMMENT_DETAIL", commentData, { params: { id: commentId } });

export const deleteComment = (commentId: string) =>
  apiCall<any>("delete", "COMMENT_DETAIL", null, { params: { id: commentId } });

export const replyToComment = async (commentId: string, post:string, text: string) => {
  await apiCall<{ id: string,post:string , text: string }>("post", `COMMENT_REPLY`, { text,post }, { params: { id: commentId } });
};

export const getCategories = () => apiCall<any[]>("get", "CATEGORIES");

export const getCategoryById = (categoryId: string) =>
  apiCall<any>("get", "CATEGORIES", null, { params: { id: categoryId } });

export const createCategory = (categoryData: any) => apiCall<any>("post", "CATEGORIES", categoryData);

export const updateCategory = (categoryId: string, categoryData: any) =>
  apiCall<any>("put", "CATEGORIES", categoryData, { params: { id: categoryId } });

export const deleteCategory = (categoryId: string) =>
  apiCall<any>("delete", "CATEGORIES", null, { params: { id: categoryId } });


export const getSubscriptions = () => apiCall<any[]>("get", "SUBSCRIPTIONS");

export const getSubscriptionById = (subscriptionId: string) =>
  apiCall<any>("get", "SUBSCRIPTIONS", null, { params: { id: subscriptionId } });

export const createSubscription = (subscriptionData: any) => apiCall<any>("post", "SUBSCRIPTIONS", subscriptionData);

export const updateSubscription = (subscriptionId: string, subscriptionData: any) =>
  apiCall<any>("put", "SUBSCRIPTIONS", subscriptionData, { params: { id: subscriptionId } });

export const deleteSubscription = (subscriptionId: string) =>
  apiCall<any>("delete", "SUBSCRIPTIONS", null, { params: { id: subscriptionId } });

export const getPaymentMethods = () => apiCall<any[]>("get", "PAYMENT_METHODS");

export const getPaymentMethodById = (paymentMethodId: string) =>
  apiCall<any>("get", "PAYMENT_METHODS", null, { params: { id: paymentMethodId } });

export const createPaymentMethod = (paymentMethodData: any) => apiCall<any>("post", "PAYMENT_METHODS", paymentMethodData);

export const updatePaymentMethod = (paymentMethodId: string, paymentMethodData: any) =>
  apiCall<any>("put", "PAYMENT_METHODS", paymentMethodData, { params: { id: paymentMethodId } });

export const deletePaymentMethod = (paymentMethodId: string) =>
  apiCall<any>("delete", "PAYMENT_METHODS", null, { params: { id: paymentMethodId } });

export const getPayments = () => apiCall<any[]>("get", "PAYMENTS");

export const getPaymentById = (paymentId: string) =>
  apiCall<any>("get", "PAYMENTS", null, { params: { id: paymentId } });

export const createPayment = (paymentData: any) => apiCall<any>("post", "PAYMENTS", paymentData);

export const updatePayment = (paymentId: string, paymentData: any) =>
  apiCall<any>("put", "PAYMENTS", paymentData, { params: { id: paymentId } });

export const deletePayment = (paymentId: string) =>
  apiCall<any>("delete", "PAYMENTS", null, { params: { id: paymentId } });

export const getNotifications = () => apiCall<any[]>("get", "NOTIFICATIONS");

export const getNotificationById = (notificationId: string) =>
  apiCall<any>("get", "NOTIFICATIONS", null, { params: { id: notificationId } });

export const markNotificationAsRead = (notificationId: string) =>
  apiCall<any>("post", "NOTIFICATIONS", null, { params: { id: notificationId, action: 'mark_as_read' } });

export const deleteNotification = (notificationId: string) =>
  apiCall<any>("delete", "NOTIFICATIONS", null, { params: { id: notificationId } });

export const getEventSchedules = () => apiCall<any[]>("get", "EVENT_SCHEDULES");

export const getEventScheduleById = (eventScheduleId: string) =>
  apiCall<any>("get", "EVENT_SCHEDULES", null, { params: { id: eventScheduleId } });

export const createEventSchedule = (eventScheduleData: any) => apiCall<any>("post", "EVENT_SCHEDULES", eventScheduleData);

export const updateEventSchedule = (eventScheduleId: string, eventScheduleData: any) =>
  apiCall<any>("put", "EVENT_SCHEDULES", eventScheduleData, { params: { id: eventScheduleId } });

export const deleteEventSchedule = (eventScheduleId: string) =>
  apiCall<any>("delete", "EVENT_SCHEDULES", null, { params: { id: eventScheduleId } });

export const getAdvertisingCampaigns = () => apiCall<any[]>("get", "ADVERTISING_CAMPAIGNS");

export const getAdvertisingCampaignById = (advertisingCampaignId: string) =>
  apiCall<any>("get", "ADVERTISING_CAMPAIGNS", null, { params: { id: advertisingCampaignId } });

export const createAdvertisingCampaign = (advertisingCampaignData: any) => apiCall<any>("post", "ADVERTISING_CAMPAIGNS", advertisingCampaignData);

export const updateAdvertisingCampaign = (advertisingCampaignId: string, advertisingCampaignData: any) =>
  apiCall<any>("put", "ADVERTISING_CAMPAIGNS", advertisingCampaignData, { params: { id: advertisingCampaignId } });

export const deleteAdvertisingCampaign = (advertisingCampaignId: string) =>
  apiCall<any>("delete", "ADVERTISING_CAMPAIGNS", null, { params: { id: advertisingCampaignId } });

export const getUsersAudit = () => apiCall<any[]>("get", "USERS_AUDIT");

export const getUsersAuditById = (usersAuditId: string) =>
  apiCall<any>("get", "USERS_AUDIT", null, { params: { id: usersAuditId } });

export const createStripePaymentIntent = (amount: number, currency: string = 'usd') =>
  apiCall<any>("post", "PAYMENTS", { amount, currency });

export const handleStripeWebhook = (payload: any, sigHeader: string) =>
  apiCall<any>("post", "STRIPE_WEBHOOK", payload, { headers: { 'Stripe-Signature': sigHeader } });

export default api;