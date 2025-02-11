import { useEffect } from "react";
import { useGlobalStore } from "@/core/store";
import { isAuthenticated } from "@/core/auth";

const useAuthCheck = () => {
  const { fetchUser, isLogged, loading } = useGlobalStore();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      if (authStatus) {
        await fetchUser();
      }
    };

    checkAuth();
  }, [fetchUser]);

  return { isLogged, loading };
};

export default useAuthCheck;