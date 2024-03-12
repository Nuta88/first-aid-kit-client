import { MedicinePriorityEnum } from "../../../../../constants/medicine";
import {
  ICategory,
  IConstantlyStoredMedicine,
  Medicine
} from '../../../../../types/medicine';
import { findSelectedCategories } from '../../helpers';

export type IFormValues = Pick<Medicine, "name" | "description"> & { categoryNames: string[], priority: string };
export type InitFormValues = Omit<IFormValues, "priority"> & { priority: string | null };
type FormError = { name: string; errors: string[]; };
export const convertMedicineToFormValues = (medicine: IConstantlyStoredMedicine): IFormValues => {
  const { name, categories, description, priority } = medicine;
  
  return {
    name,
    description,
    priority,
    categoryNames: categories.map(c => c.name)
  } as IFormValues
};
export const createInitFormValues = (medicine: IConstantlyStoredMedicine | null): InitFormValues => {
  if ( medicine ) return convertMedicineToFormValues(medicine);
  
  return { name: '', description: '', priority: MedicinePriorityEnum.CATEGORY, categoryNames: [] };
};
export const generateMedicine = (values: IFormValues, categories: ICategory[]) => {
  const { categoryNames, name='', ...changedValues } = values;
  
  return {
    ...changedValues,
    name,
    categories: findSelectedCategories(categoryNames, categories)
  }
};

export const isMedicineExisted = (medicine: IConstantlyStoredMedicine | null, medicines: Medicine[]): boolean => {
  return !!medicine?.id && !medicines.some(m => m.name === medicine?.name);
};

export const getFormRules = (isDisabledFormItem: boolean) => {
  return(
    {
      category: isDisabledFormItem ? [] : [ { required: true, message: 'Please select category!' } ],
      name: isDisabledFormItem ? []:
        [
          { required: true, message: 'Please input name!' },
          {
            min: 2,
            max: 50,
            message: 'Recipient must be from 2 characters to 50 characters!'
          }
      ],
    }
  )
};

export const isFormDisabled = (medicine: IConstantlyStoredMedicine | null, medicines: Medicine[]) => {
  return !!medicine && !isMedicineExisted(medicine, medicines);
};

const findCategoryByNames = (names: string[], categories: ICategory[]) => {
  return categories.length === names.length && categories.every(c => names.includes(c.name)) ? names : [];
};

const createCategoryError = (categories: string[], errors: FormError[]) => {
  if ( categories.length ) {
    errors.push({
      name: "categoryNames",
      errors: [`Medicine with ${categories} category exist`],
    });
  }
};
const createNameError = (name: string, medicine: IConstantlyStoredMedicine, errors: FormError[]) => {
  if ( name && name.toLowerCase() === medicine.name.toLowerCase() ) {
    errors.push({
      name: "name",
      errors: [`Medicine with ${name} name exist`],
    })
  }
};

export const generateErrorFormFields = (values: IFormValues, csMedicines: IConstantlyStoredMedicine[]): FormError[] => {
  const errors: FormError[] = [];
  
  csMedicines.forEach(medicine => {
    const { priority, categoryNames, name= '' } = values;
    
    if ( medicine.priority === priority ) {
      const categories = findCategoryByNames(categoryNames, medicine.categories);
      
      if ( priority === MedicinePriorityEnum.CATEGORY ) {
        createCategoryError(categories, errors);
        return;
      }
  
      createCategoryError(categories, errors);
      createNameError(name, medicine, errors);
    }
  });
  
  return errors;
};
