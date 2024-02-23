import { TAuditMedicine } from '../types/audit';

import {
  auditFiltersStoreName,
  auditStoreName,
  dbPromise
} from './indexedDB';

const sortedAudit = (audits: TAuditMedicine[]) => {
  return [...audits].sort((a,b) => {
    if ( !a.isCorrect ) return -1;
    if ( a.amount === a.new_amount && b.isCorrect ) return -1;
    if ( a.isCorrect === b.isCorrect ) return 0;
    
    return 1;
  } );
};

export const saveAuditMedicines = async (medicines: TAuditMedicine[]) => {
  const db = await dbPromise;
  const store = db.transaction(auditStoreName, 'readwrite').objectStore(auditStoreName);
  
  if (store) store.clear();
  
  medicines.forEach((medicine) => {
    store.add(medicine, medicine.id as number);
  });
  
  const audits = await store.getAll();
  
  return sortedAudit(audits);
};

export const updateAuditMedicine = async (medicine: TAuditMedicine): Promise<TAuditMedicine[]> => {
  const db = await dbPromise;
  const tx = db.transaction(auditStoreName, 'readwrite');
  const store = tx.objectStore(auditStoreName);

  const data = await store.getAll();
  
  if ( data.length ) await store.put(medicine, medicine.id);
  
  const audits = await store.getAll();
  
  return sortedAudit(audits);
};

export const getAudits = async (): Promise<TAuditMedicine[]> => {
  const db = await dbPromise;
  const store = db.transaction(auditStoreName, 'readonly').objectStore(auditStoreName);
  const audits: TAuditMedicine[] = await store.getAll();
 
  return sortedAudit(audits);
};

export const deleteAudit = async (id: number) => {
  const db = await dbPromise;
  const store = db.transaction(auditStoreName, 'readwrite').objectStore(auditStoreName);
  
  await store.delete(id);
  
  const audits = await store.getAll();
  
  return sortedAudit(audits);
};

export const saveSearchedAuditFilter = async (filter: string) => {
  const db = await dbPromise;
  const tx = db.transaction(auditFiltersStoreName, 'readwrite');
  const store = tx.objectStore(auditFiltersStoreName);
  
  store.put(filter, 'name');
  
  await tx.done;
};

export const getSearchFilter = async () => {
  const db = await dbPromise;
  const store = db.transaction(auditFiltersStoreName, 'readonly').objectStore(auditFiltersStoreName);
  
  return await store.get('name');
};
