import { openDB } from 'idb';

const dbName = 'first_aid_kit_database';
export const authStoreName = 'auth';
export const auditStoreName = 'audit';

export const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(authStoreName);
    db.createObjectStore(auditStoreName);
    },
});

export const clearStores = async () => {
  const db = await dbPromise;
  const authTx = db.transaction(authStoreName, 'readwrite');
  const authStore = authTx.objectStore(authStoreName);
  const auditTx = db.transaction(auditStoreName, 'readwrite');
  const auditStore = auditTx.objectStore(auditStoreName);

  authStore.clear();
  auditStore.clear();
}


