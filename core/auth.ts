import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINTS } from "./config";
import api from "./api";

// Token management
export const setAuthTokens = async (access: string, refresh: string) => {
  await AsyncStorage.multiSet([["access_token", access], ["refresh_token", refresh]]);
};

export const getAuthTokens = async () => {
  const [access, refresh] = await AsyncStorage.multiGet(["access_token", "refresh_token"]);
  return { access: access[1], refresh: refresh[1] };
};

export const removeAuthTokens = async () => {
  await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
};

export const isAuthenticated = async () => {
  const { access } = await getAuthTokens();
  return !!access;
};

export const refreshAccessToken = async () => {
  const { refresh } = await getAuthTokens();
  if (!refresh) throw new Error("No refresh token available");

  try {
    const response = await api.post(ENDPOINTS.TOKEN_REFRESH, { refresh });
    await setAuthTokens(response.data.access, refresh);
    return response.data.access;
  } catch (error) {
    await removeAuthTokens();
    throw error;
  }
};