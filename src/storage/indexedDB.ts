import { openDB } from 'idb';

const dbName = 'first_aid_kit_database';
export const authStoreName = 'auth';
export const auditStoreName = 'audit';
export const auditFiltersStoreName = 'audit_filters';

export const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(authStoreName);
    db.createObjectStore(auditFiltersStoreName);
    
    const auditStore = db.createObjectStore(auditStoreName);
    auditStore.createIndex('expiration_date', 'expiration_date');
    },
});

export const clearStores = async () => {
  const db = await dbPromise;
  
  const authTx = db.transaction(authStoreName, 'readwrite');
  const authStore = authTx.objectStore(authStoreName);
  
  const auditTx = db.transaction(auditStoreName, 'readwrite');
  const auditStore = auditTx.objectStore(auditStoreName);
  
  const auditFiltersTx = db.transaction(auditFiltersStoreName, 'readwrite');
  const auditFiltersStore = auditFiltersTx.objectStore(auditFiltersStoreName);

  authStore.clear();
  auditStore.clear();
  auditFiltersStore.clear();
}


