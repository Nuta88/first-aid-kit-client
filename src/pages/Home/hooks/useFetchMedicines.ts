import { useQueryFilters } from '../../../hooks';
import { useFetchConstantlyStoredMedicineQuery } from '../../../services/constantlyStoredMedicine';
import {
  useFetchExpiredMedicineQuery,
  useFetchMedicineQuery
} from '../../../services/medicine';

export const useFetchMedicines = () => {
  const { query: expiredMedicineQuery, setQuery: setExpiredMedicineQuery } = useQueryFilters();
  const { query: medicineQuery, setQuery: setMedicineQuery } = useQueryFilters();
  const { data: medicines = [], isFetching: isFetchingMedicine } = useFetchMedicineQuery(medicineQuery);
  const { data: expiredMedicines = [], isFetching: isFetchingExpiredMedicines } = useFetchExpiredMedicineQuery(expiredMedicineQuery);
  const { data: csMedicines = [], isFetching: isFetchingCSMedicines } = useFetchConstantlyStoredMedicineQuery({});
  
  return {
    medicines,
    csMedicines,
    expiredMedicines,
    medicineQuery,
    expiredMedicineQuery,
    isLoading: isFetchingMedicine || isFetchingExpiredMedicines || isFetchingCSMedicines,
    setExpiredMedicineQuery,
    setMedicineQuery
  };
}
