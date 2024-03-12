import { Colors } from '../../../constants/common';
import { TAuditMedicine } from '../../../types/audit';
import { TMedicine } from '../../../types/medicine';
import { isEqualsByKeys } from '../../../utils/object';

const isRowAmountEquals = (audit: TAuditMedicine) => audit.amount === audit.new_amount;

export const getRowBackground = (row: TAuditMedicine) => {
 if ( !row.new_amount ) return Colors.Default;
 
 if ( !row.isCorrect ) return Colors.Primary;
 
 return isRowAmountEquals(row) ? Colors.Success : Colors.Default;
};

export const convertToDefaultAudits = (medicines: TMedicine[] | TAuditMedicine[]): TAuditMedicine[] => {
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
   .map(audit => selectedKeys.includes(audit.id.toString()) ? {...audit, amount: audit.new_amount, isCorrect: true } : audit);
};

export const getSearchedAudit = (audits: TAuditMedicine[], searchValue: string) => {
 if ( !searchValue) return audits;
 
 return audits.filter(a => a.name.includes(<string>searchValue));
}

export const amountOfMatchedAudits = (audits: TAuditMedicine[]): number => {
 return audits.filter(audit => isRowAmountEquals(audit)).length;
};
export const amountOfUnMatchedAudits = (audits: TAuditMedicine[]): number => {
 return audits.filter(audit => !audit.isCorrect).length;
};

export const idDisabledReset = (audits: TAuditMedicine[]): boolean => {
 return !(amountOfMatchedAudits(audits) || amountOfUnMatchedAudits(audits));
};

export const isAllAuditsChanged = (audits: TAuditMedicine[]): boolean => {
 return (amountOfMatchedAudits(audits) + amountOfUnMatchedAudits(audits)) === audits.length;
};

export const isAllUnMatchedAuditsSelected = (audits: TAuditMedicine[], selectedKeys: React.Key[]): boolean => {
 return amountOfUnMatchedAudits(audits) === selectedKeys.length;
};

export const updateSelectedAuditsToMatched = (audits: TAuditMedicine[], selectedKeys: React.Key[]) => {
 return audits
   .map(audit => selectedKeys.includes(audit.id.toString()) ? {...audit, amount: audit.new_amount, isCorrect: true } : audit);
};

export const findMissingMedicineInAudits = (audits: TAuditMedicine[], medicines: TMedicine[]): TMedicine[] => {
 const auditIds = audits.map(a => a.id);
 
 return medicines.filter(m => !auditIds.includes(m.id));
};

export const isFinishAudit = (audits: TAuditMedicine[], selectedKeys: React.Key[]) => {
 return isAllAuditsChanged(audits) && isAllUnMatchedAuditsSelected(audits, selectedKeys);
}

export const prepareDataForStore = (audits: TAuditMedicine[], medicines: TMedicine[]): TAuditMedicine[] => {
 if ( !audits.length ) convertToDefaultAudits(medicines);

 const newMedicines = findMissingMedicineInAudits(audits, medicines);
 
 return [...audits, ...convertToDefaultAudits(newMedicines)];
};

export const isEquals = (medicines: TMedicine[], audits: TAuditMedicine[]) => {
 if (medicines.length !== audits.length || !medicines.length || !audits.length) return false;
 
 const keys = Object.keys(medicines[0]);
 const sortedArr1 = [...medicines].sort((a,b) => a.id - b.id);
 const sortedArr2 = [...audits].sort((a,b) => a.id - b.id);
 
 for (let i = 0; i < sortedArr1.length; i++) {
  if (!isEqualsByKeys(sortedArr1[i], sortedArr2[i], keys)) return false;
 }
 
 return true;
};
