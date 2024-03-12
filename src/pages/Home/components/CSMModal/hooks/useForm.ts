import { IConstantlyStoredMedicine } from "../../../../../types/medicine";
import { useFetchMedicines } from "../../../hooks/useFetchMedicines";
import {
  createInitFormValues,
  getFormRules,
  isFormDisabled
} from '../helpers';

export const useForm = (medicine: IConstantlyStoredMedicine | null) => {
  const { medicines, expiredMedicines } = useFetchMedicines();
  const isDisabledFormItem = isFormDisabled(medicine, [...medicines, ...expiredMedicines]);
  const rules = getFormRules(isDisabledFormItem);
  const initialValues = createInitFormValues(medicine);
  
  return {
    rules,
    isDisabledFormItem,
    initialValues
  }
};
