import { openDB } from 'idb';

const dbName = 'my-database';
const storeName = 'tokens';

export const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(storeName);
  },
});

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.put(accessToken, 'accessToken');
  store.put(refreshToken, 'refreshToken');
  store.put(accessToken, 'accessToken');
 
  await tx.done;
};

export const getTokens = async () => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const accessToken = await store.get('accessToken');
  const refreshToken = await store.get('refreshToken');
  
  return { accessToken, refreshToken };
};
export const clearTokens = async () => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  // @ts-ignore
  store.clear();
};
