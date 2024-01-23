import { replaceUnderscoreToSpace } from './string';

export const generateOptions = <T extends Partial<T>>(list: T[], value: keyof T, label?: keyof T) => (
  list.map((item: T) => ({
    value: item[value],
    label: replaceUnderscoreToSpace(item[label ?? value] as string),
  }))
);
