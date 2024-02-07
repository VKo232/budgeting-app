// force the state to clear with fast refresh in Expo
// @refresh reset
import { SQLiteDatabase } from 'expo-sqlite';
import React, { useEffect } from 'react';
import db from './database';

export const DatabaseContext = React.createContext<SQLiteDatabase>(db.database);

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const database = db.database;

  // Start up operations
  useEffect(() => {
    async function loadDataAsync() {
      try {
        await db.setupDatabaseAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    loadDataAsync();
  }, []);

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
