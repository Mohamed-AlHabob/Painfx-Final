import NetInfo from '@react-native-community/netinfo';
import { retryQueuedRequests } from './requestQueue';
import { useEffect, useState } from 'react';

let isOnline = true;

export const initNetworkListener = () => {
  NetInfo.addEventListener(state => {
    isOnline = state.isConnected ?? false;
    if (isOnline) {
      retryQueuedRequests();
    }
  });
};

export const getNetworkStatus = () => isOnline;


export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return isOnline;
};