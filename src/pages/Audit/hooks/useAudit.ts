import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useFetchMedicineQuery,
  useUpdateMedicinesMutation
} from '../../../services/medicine';
import {
  getAuditMedicines,
  saveAuditMedicines,
  updateAuditMedicine
} from '../../../storage/audit';
import { TAuditMedicine } from '../../../types/audit';
import {
  changedCorrectValueForUpdatedAudits,
  convertMedicinesToDefaultAudit,
  convertSelectedAuditsToMedicines,
  isEquals
} from '../helpers/helpers';

export const useAudit = () => {
  const { data: medicines = [] } = useFetchMedicineQuery({});
  const [ updateMedicines, result ] = useUpdateMedicinesMutation({});
  const [ auditMedicines, setAuditMedicines ] = useState<TAuditMedicine[]>([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
  
  const handleSaveMedicinesToAuditStore = useCallback(async (audits: TAuditMedicine[]) => {
    await saveAuditMedicines(audits);
    
    const items = await getAuditMedicines();
    
    items.length && setAuditMedicines(items);
  }, [ ]);
  
  useEffect(() => {
    async function fetchAuditData() {
      let items: TAuditMedicine[] = await getAuditMedicines();
  
      if ( items?.length && isEquals(medicines, items) ) {
        setAuditMedicines(items);
        return;
      }
      
      await handleSaveMedicinesToAuditStore(convertMedicinesToDefaultAudit(medicines));
    }
  
    medicines.length && fetchAuditData();
  }, [medicines.length]);
  
  const onUpdateAudit = useCallback(async (value: TAuditMedicine) => {
    const newValue = {...value, isCorrect: value.new_amount === value.amount };
    const items = await updateAuditMedicine(newValue);
  
    setSelectedRowKeys(prevState => prevState.filter(key => key !== value.id.toString()));
    setAuditMedicines(items);
  }, []);
  
  const onSyncMedicines = async () => {
    const medicinesForSync = convertSelectedAuditsToMedicines(auditMedicines, selectedRowKeys);
    await updateMedicines(medicinesForSync);
    await handleSaveMedicinesToAuditStore(changedCorrectValueForUpdatedAudits(auditMedicines, selectedRowKeys))
    
    setSelectedRowKeys([]);
  };
  
  const onSelectAudits = (keys: React.Key[]) => {
    setSelectedRowKeys(keys);
  };
  
  return {
    medicines: auditMedicines,
    selectedRowKeys,
    isLoading: result.isLoading,
    onUpdateAudit,
    onSyncMedicines,
    onSelectAudits
  };
}
