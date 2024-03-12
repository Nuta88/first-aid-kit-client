export const isObjectEmpty =  <T extends Partial<T>>(obj: T): boolean => {
  return Object.keys(obj).length === 0;
};

export const isEqualsByKeys = (obj1: any, obj2: any, keys: string[]): boolean => {
  return keys.every((key: string) => {
    if ( !Array.isArray(obj1[key]) ) return obj1[key] === obj2[key];
    
    const arrKeys = Object.keys(obj1[key][0]);
    return isEqualsByKeys(obj1[key], obj2[key], arrKeys);
  });
};
