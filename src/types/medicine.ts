import { MedicinePriorityEnum } from "../constants/medicine";

export interface ICategory {
  id?: number | undefined;
  name: string
}
export interface IConstantlyStoredMedicine {
  id?: number | null;
  name: string
  categories: ICategory[];
  priority: string;
  description?: string | null;
  isMissing?: boolean;
}

export class Medicine {
  id?: number | null;
  name: string
  categories: ICategory[];
  amount: number;
  expiration_date: string;
  description?: string | null;
  constructor (
    name: string = '',
    categories: ICategory[] = [],
    amount: number = 1,
    expiration_date: string = '',
    description: string | null = null,
    id: number | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.categories = categories;
    this.amount = amount;
    this.expiration_date = expiration_date;
    this.description = description;
  }
}

export class ConstantlyStoredMedicine {
  id?: number | null;
  name: string
  categories: ICategory[];
  priority: string;
  description?: string | null;
  constructor (
    name: string = '',
    categories: ICategory[] = [],
    description: string | null = null,
    priority: string = MedicinePriorityEnum.CATEGORY,
    id: number | null = null,
  ) {
    this.id = id;
    this.name = name;
    this.categories = categories;
    this.priority = priority;
    this.description = description;
  }
}

export type TMedicine = Omit<Medicine, 'id'> & { id: number };
