import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { syncPendingRequests } from '../services/syncService';

export const useNetworkSync = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    // Listen to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        syncPendingRequests();
      }
    });

    // Also try syncing immediately on mount
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        syncPendingRequests();
      }
    });

    return () => unsubscribe();
  }, [enabled]);
};
