import {
  ICategory,
  IConstantlyStoredMedicine,
  Medicine
} from '../../../../types/medicine';
import { findSelectedCategories } from '../helpers';

export type IFormValues = Pick<Medicine, "name" | "description"> & { categoryNames: string[], priority: string };
export const convertMedicineToFormValues = (medicine: IConstantlyStoredMedicine): IFormValues => {
  const { name, categories, description, priority } = medicine;
  
  return <IFormValues>{
    name,
    description,
    priority,
    categoryNames: categories.map(c => c.name)
  }
};
export const createInitFormValues = (medicine: IConstantlyStoredMedicine | null): IFormValues => {
  if ( medicine ) return convertMedicineToFormValues(medicine);
  
  return { name: '', description: '', priority: '', categoryNames: [] };
};
export const generateMedicine = (values: IFormValues, categories: ICategory[]) => {
  const { categoryNames, ...changedValues } = values;
  
  return {
    ...changedValues,
    categories: findSelectedCategories(categoryNames, categories)
  }
}

export const isMedicineExisted = (medicine: IConstantlyStoredMedicine | null): boolean => !!medicine?.id;
