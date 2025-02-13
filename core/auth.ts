import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"
import { ENDPOINTS } from "./config"
export const setAuthTokens = async (access: string, refresh: string) => {
  await AsyncStorage.setItem("access_token", access);
  await AsyncStorage.setItem("refresh_token", refresh);
  console.log("Tokens set successfully");
};

export const getAuthTokens = async () => {
  const access = await AsyncStorage.getItem("access_token");
  const refresh = await AsyncStorage.getItem("refresh_token");
  console.log("Retrieved tokens:", { access, refresh });
  return { access, refresh };
};

export const removeAuthTokens = async () => {
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("refresh_token");
  console.log("Tokens removed successfully");
};

export const isAuthenticated = async () => {
  const isAuth = await AsyncStorage.getItem("is_authenticated")
  return isAuth === "true"
}

export const refreshAccessToken = async () => {
  const { refresh } = await getAuthTokens()
  if (!refresh) {
    throw new Error("No refresh token available")
  }

  try {
    const response = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh })
    await setAuthTokens(response.data.access, refresh)
    return response.data.access
  } catch (error) {
    console.error("Error refreshing token:", error)
    await removeAuthTokens()
    throw error
  }
}

