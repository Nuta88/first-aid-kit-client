import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useDeleteMedicineMutation,
  useFetchMedicineQuery,
  useUpdateMedicineMutation
} from '../services/medicine';
import {
  getAuditMedicines,
  saveAuditMedicines,
  updateAuditMedicines
} from '../storage/audit';
import { TAuditMedicine } from '../types/audit';

export const useAudit = () => {
  const { data: medicines = [] } = useFetchMedicineQuery({});
  const [ updateMedicine ] = useUpdateMedicineMutation({});
  const [ deleteMedicine ] = useDeleteMedicineMutation({});
  const [ auditMedicines, setAuditMedicines ] = useState<TAuditMedicine[]>([]);
  
  const handleSaveMedicines = useCallback(async () => {
    await saveAuditMedicines(medicines);
    
    const items = await getAuditMedicines();
    setAuditMedicines(items);
  }, [ medicines ]);
  
  useEffect(() => {
    async function fetchAuditData() {
      let items: TAuditMedicine[] = await getAuditMedicines();
      
      if ( items?.length && medicines.length === items.length ) {
        setAuditMedicines(items);
        return;
      }
      
      medicines.length && await handleSaveMedicines();
    }
    fetchAuditData();
  }, [medicines]);
  
  const updateAudit = async (value: TAuditMedicine) => {
    let items: TAuditMedicine[] = await updateAuditMedicines(value);
    
    if ( items?.length ) setAuditMedicines(items);
  };
  
  const onAudit = async () => {
    const sortedMedicines = auditMedicines
      .map(am => am.amount !== am.new_amount ? {...am, isCorrect: false} : am)
      .sort(am => am.isCorrect ? 1 : -1);
    
    setAuditMedicines(sortedMedicines);
  };
  
  const onUpdateMedicine = useCallback( async (value: TAuditMedicine) => {
    const {new_amount, isCorrect, ...medicine} = value;
    if ( new_amount ) {
      await updateMedicine({...medicine, amount: new_amount});
      await handleSaveMedicines();
      return;
    }
    
    deleteMedicine(value.id);
  }, []);
  
  return { medicines: auditMedicines, updateAudit, onAudit, onUpdateMedicine };
}
