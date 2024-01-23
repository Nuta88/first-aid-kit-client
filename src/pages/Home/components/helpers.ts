import { dateFormat } from '../../../constants/common';
import {
  ICategory,
  Medicine
} from '../../../types/medicine';
import {
  convertDateToString,
  isExpiresThisMonth,
  parseDate,
  today,
  TParseDate
} from '../../../utils/date';


export type IFormValues = Omit<Medicine, "expiration_date"> & { expiration_date: TParseDate, categoryNames: string[] };
// TODO: Update
export const getTableRowColor = (date: string) => isExpiresThisMonth(date) ? 'rgba(236,165,165,0.43)' : 'default';

const convertMedicineToFormValues = (medicine: Medicine): IFormValues => {
  return {
    ...medicine,
    categoryNames: medicine.categories.map(c => c.name),
    expiration_date: parseDate(medicine['expiration_date'], dateFormat)
  } as IFormValues
};
export const createInitFormValues = (medicine: Medicine | null): IFormValues => {
  if ( medicine ) return convertMedicineToFormValues(medicine);
  
  return { ...new Medicine(), categoryNames: [], expiration_date: today };
};

export const findSelectedCategories = (names: string[], categories: ICategory[]) => {
  return categories.filter((c: ICategory) => names.includes(c.name));
};
export const generateMedicine = (values: IFormValues, medicine: Medicine | null, categories: ICategory[]) => {
  const { name, categoryNames, expiration_date, ...changedValues } = values;
  
  return {
    ...medicine,
    ...changedValues,
    name: name.toLowerCase(),
    categories: findSelectedCategories(categoryNames, categories),
    expiration_date: convertDateToString(expiration_date)
  }
}
