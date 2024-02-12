import {
  dbPromise,
  authStoreName
} from './indexedDB';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  const db = await dbPromise;
  const tx = db.transaction(authStoreName, 'readwrite');
  const store = tx.objectStore(authStoreName);
  store.put(accessToken, 'accessToken');
  store.put(refreshToken, 'refreshToken');
  
  await tx.done;
};

export const getTokens = async () => {
  const db = await dbPromise;
  const tx = db.transaction(authStoreName, 'readonly');
  const store = tx.objectStore(authStoreName);
  const accessToken = await store.get('accessToken');
  const refreshToken = await store.get('refreshToken');
  
  return { accessToken, refreshToken };
};
export const clearTokens = async () => {
  const db = await dbPromise;
  const tx = db.transaction(authStoreName, 'readwrite');
  const store = tx.objectStore(authStoreName);

  store.clear();
};
