import { Colors } from '../../../constants/common';
import { TAuditMedicine } from '../../../types/audit';
import { TMedicine } from '../../../types/medicine';

const isRowAmountEquals = (audit: TAuditMedicine) => audit.amount === audit.new_amount;

export const getRowBackground = (row: TAuditMedicine) => {
 if ( !row.new_amount ) return Colors.Default;
 
 if ( !row.isCorrect ) return Colors.Primary;
 
 return isRowAmountEquals(row) ? Colors.Success : Colors.Default;
};

export const getSortedAndVerifiedMedicines = (auditMedicines: TAuditMedicine[]) => {
 return auditMedicines
   .map(am => am.new_amount && am.amount !== am.new_amount ? {...am, isCorrect: false } : am)
   .sort(am => am.isCorrect ? 1 : -1);
};

export const convertMedicinesToDefaultAudit = (medicines: TMedicine[]): TAuditMedicine[] => {
 return medicines.map(medicine => ({...medicine, new_amount: 0, isCorrect: true }));
};

export const convertAuditToMedicine = (audit: TAuditMedicine): TMedicine => {
 const { new_amount, isCorrect, ...medicine } = audit;
 
 return {...medicine, amount: new_amount };
};

export const convertSelectedAuditsToMedicines = (audits: TAuditMedicine[], selectedKeys: React.Key[]): TMedicine[] => {
 return audits
   .filter(audit =>  selectedKeys.includes(audit.id.toString()))
   .map(audit => convertAuditToMedicine(audit))
};

export const changedCorrectValueForUpdatedAudits = (audits: TAuditMedicine[], selectedKeys: React.Key[]) => {
 return audits
   .map(audit => selectedKeys.includes(audit.id.toString()) ? {...audit, amount: audit.new_amount, new_amount: 0, isCorrect: true } : audit);
};

export const isEquals = (arr1: TMedicine[], arr2: TAuditMedicine[]) => {
 if (arr1.length !== arr2.length || !arr1.length || !arr2.length) return false;
 
 const keys = Object.keys(arr1[0]);
 const sortedArr1 = [...arr1].sort((a,b) => a.id - b.id);
 const sortedArr2 = [...arr2].sort((a,b) => a.id - b.id);
 
 for (let i = 0; i < sortedArr1.length; i++) {
  if (!isEqualsByKeys(sortedArr1[i], sortedArr2[i], keys)) return false;
 }
 
 return true;
};

const isEqualsByKeys = (obj1: any, obj2: any, keys: string[]): boolean => {
 return keys.every((key: string) => {
  if ( !Array.isArray(obj1[key]) ) return obj1[key] === obj2[key];

  const arrKeys = Object.keys(obj1[key][0]);
  return isEqualsByKeys(obj1[key], obj2[key], arrKeys);
 });
};
