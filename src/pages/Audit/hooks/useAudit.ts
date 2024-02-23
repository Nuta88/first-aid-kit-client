import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { useMessage } from '../../../hooks';
import {
  useDeleteMedicineMutation,
  useFetchMedicineQuery,
  useUpdateMedicinesMutation
} from '../../../services/medicine';
import {
  deleteAudit,
  getAudits,
  saveAuditMedicines,
  updateAuditMedicine
} from '../../../storage/audit';
import { TAuditMedicine } from '../../../types/audit';
import {
  amountOfMatchedAudits,
  convertSelectedAuditsToMedicines,
  convertToDefaultAudits,
  getSearchedAudit,
  isEquals,
  isFinishAudit,
  prepareDataForStore,
  updateSelectedAuditsToMatched
} from '../helpers/helpers';
import { useRowSelection } from "./useRowSelection";
import { useSearch } from './useSearch';

export const useAudit = () => {
  const { data: medicines = [] } = useFetchMedicineQuery({});
  const { search, onSearch, onClearSearch } = useSearch();
  const { rowSelection, selectedRowKeys, onSelectAudits } = useRowSelection();
  const { onSuccess } = useMessage();
  const [ updateMedicines, result ] = useUpdateMedicinesMutation({});
  const [ deleteMedicine ] = useDeleteMedicineMutation({});
  const [ auditMedicines, setAuditMedicines ] = useState<TAuditMedicine[]>([]);
  
  const handleSaveToAuditStore = useCallback(async (audits: TAuditMedicine[]) => {
    const items = await saveAuditMedicines(audits);
  
    items.length && setAuditMedicines(items);
  }, [ ]);
  
  useEffect(() => {
    async function fetchAuditData() {
      const items: TAuditMedicine[] = await getAudits();
      
      if ( items?.length && isEquals(medicines, items) ) {
        setAuditMedicines(items);
        return;
      }
      
      await handleSaveToAuditStore(prepareDataForStore(items, medicines));
    }
  
    medicines.length && fetchAuditData();
  }, [medicines.length]);
  
  const onUpdateAudit = useCallback(async (value: TAuditMedicine) => {
    const newValue = {...value, isCorrect: value.new_amount === value.amount };
    const items = await updateAuditMedicine(newValue);
  
    onSelectAudits(selectedRowKeys.filter(key => key !== value.id.toString()));
    onSuccess(`Amount of "${value.name}" audit updated successfully!`);
    setAuditMedicines(items);
  }, []);
  
  const onFinishAudit = async () => {
    await handleSaveToAuditStore(convertToDefaultAudits(auditMedicines));
    onSelectAudits([]);
    onSuccess('You are finished this audit!');
  };
  
   const onSaveSelectedAuditsAsMatched = async () => {
     await handleSaveToAuditStore(updateSelectedAuditsToMatched(auditMedicines, selectedRowKeys));
     onSelectAudits([]);
     onSuccess('Selected medicines have been successfully updated!');
  };
  
  const onSyncMedicines = async () => {
    const medicinesForSync = convertSelectedAuditsToMedicines(auditMedicines, selectedRowKeys);
    
    await updateMedicines(medicinesForSync);
    
    if ( isFinishAudit(auditMedicines, selectedRowKeys)) return await onFinishAudit();
    
    await onSaveSelectedAuditsAsMatched();
  };
  
  const onResetAudits = useCallback(async () => {
    await onClearSearch();
    await handleSaveToAuditStore(convertToDefaultAudits(auditMedicines));
  
    onSelectAudits([]);
    onSuccess('Audit reset successfully!');
  }, []);
  
  const onDeleteMedicine = useCallback(async (id: number) => {
    const searchedAudits = getSearchedAudit(auditMedicines, search);
    
    if ( !searchedAudits.length ) await onClearSearch();
    
    await deleteAudit(id).then(() => {
      onSuccess('Medicine deleted successfully!');
    });
    deleteMedicine(id);
  }, []);
  
  return {
    audits: {
      items: getSearchedAudit(auditMedicines, search),
      total: auditMedicines.length,
      matched: amountOfMatchedAudits(auditMedicines),
      unMatched: amountOfMatchedAudits(auditMedicines),
    },
    rowSelection,
    selectedRowKeys,
    isLoading: result.isLoading,
    search,
    onUpdateAudit,
    onSyncMedicines,
    onDeleteMedicine,
    onSearch,
    onClearSearch,
    onResetAudits
  };
}
