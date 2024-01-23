import { Medicine } from '../types/medicine';

export const getTitleCount = <T extends Partial<T>>(list: T[]): string => list.length ? `(${list.length})` : '';

export const getNamesAndCategories = (medicines: Medicine[]) => medicines.map(m => ({name: m.name, categories: m.categories}));
