import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync('medblue.db');
    
    // Create sync queue table
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        method TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        image_uri TEXT,
        temp_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create cache table for GET requests
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database', error);
  }
};

export const getDB = (): SQLite.SQLiteDatabase => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
