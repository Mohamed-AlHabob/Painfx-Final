import { useEffect, useCallback } from "react";
import { useGlobalStore } from "@/core/store";
import { isAuthenticated } from "@/core/auth";

export const useAuthCheck = () => {
  const { fetchUser, isLogged, loading, setLoading } = useGlobalStore();

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const authStatus = await isAuthenticated();
      if (authStatus && !isLogged) {
        await fetchUser();
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchUser, setLoading, isLogged]);

  useEffect(() => {
    if (!isLogged && !loading) {
      checkAuth();
    }
  }, [checkAuth, isLogged, loading]);

  return { isLogged, loading };
};