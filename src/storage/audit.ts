import { TAuditMedicine } from '../types/audit';

import {
  auditStoreName,
  dbPromise
} from './indexedDB';

export const saveAuditMedicines = async (medicines: TAuditMedicine[]) => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readwrite');
  const store = tx.objectStore(auditStoreName);
  
  store.clear();
  
  medicines.forEach((medicine) => {
    store.add(medicine, medicine.id as number);
  });
  
  await tx.done;
};
export const updateAuditMedicines = async (medicines: TAuditMedicine[]) => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readwrite');
  const store = tx.objectStore(auditStoreName);
  
  store.clear();
  
  medicines.forEach((medicine) => {
    store.add(medicine, medicine.id);
  });
  
  return store.getAll();
};

export const updateAuditMedicine = async (medicine: TAuditMedicine): Promise<TAuditMedicine[]> => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readwrite');
  const store = tx.objectStore(auditStoreName);
  const data = await store.getAll();
  
  if ( data.length ) {
    await store.put(medicine, medicine.id);
  }
  
  return store.getAll();
};

export const getAuditMedicines = async (): Promise<TAuditMedicine[]> => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readonly');
  const store = tx.objectStore(auditStoreName);
  
  return store.getAll();
};

export const clearAudit = async () => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readwrite');
  const store = tx.objectStore(auditStoreName);
  
  store.clear();
};
