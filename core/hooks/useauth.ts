import { useEffect, useState } from 'react';
import { isAuthenticated, getAuthTokens, removeAuthTokens } from '@/core/utils/secureStorage';
import { useRouter, useSegments } from 'expo-router';

export const useAuth = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  const checkAuth = async () => {
    setLoading(true);
    try {
      const authenticated = await isAuthenticated();
      setIsLogged(authenticated);

      const inAuthGroup = segments[0] === '(root)';
      if (authenticated && !inAuthGroup) {
        router.replace('/(root)/(tabs)/chat');
      } else if (!authenticated && inAuthGroup) {
        router.replace('/(public)');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [segments]);

  return { isLogged, loading };
};