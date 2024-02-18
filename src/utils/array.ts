interface MyObject {
  // @ts-ignore
  [key: string]: any;
  
  // @ts-ignore
  [secondKey: string]: any;
}

export const isEqualsBy = <T extends Partial<T> & MyObject>(arr1: T[], arr2: T[], key: string = 'id', secondKey: string = 'id') => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  const sortedArr1 = arr1.slice().sort((a, b) => a[key] > b[key] ? 1 : -1);
  const sortedArr2 = arr2.slice().sort((a, b) => a[key] > b[key] ? 1 : -1);
  
  return sortedArr1.every((val, index) => val[secondKey] === sortedArr2[index][secondKey]);
}
