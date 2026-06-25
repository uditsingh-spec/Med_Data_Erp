import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, DeviceEventEmitter, StyleSheet } from 'react-native';

export const GlobalSyncBanner: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | null>(null);

  useEffect(() => {
    const subStart = DeviceEventEmitter.addListener('syncStarted', () => setSyncStatus('syncing'));
    const subComplete = DeviceEventEmitter.addListener('syncCompleted', () => {
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus(null), 3000);
    });

    return () => {
      subStart.remove();
      subComplete.remove();
    };
  }, []);

  if (!syncStatus) return null;

  return (
    <View style={styles.syncBanner}>
      {syncStatus === 'syncing' ? (
        <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
      ) : null}
      <Text style={styles.syncText}>
        {syncStatus === 'syncing' ? 'Syncing...' : 'Synced successfully'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  syncBanner: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.95)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  syncText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  }
});
