import React, { useEffect, useState } from 'react';
import { useNetworkSync } from '../hooks/useNetworkSync';
import { initDB } from '../services/db';

export const NetworkSyncWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dbReady, setDbReady] = useState(false);

  useNetworkSync(dbReady);

  useEffect(() => {
    initDB().then(() => setDbReady(true));
  }, []);

  if (!dbReady) return null;

  return <>{children}</>;
};
