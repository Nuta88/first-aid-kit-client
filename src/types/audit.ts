import { Medicine } from './medicine';

export type TAuditMedicine = Medicine & { id: number, new_amount: number, isCorrect: boolean  };
