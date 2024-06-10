import { TQueryFilter } from '../../types/query';
import { useSearch } from './useSearch';
import { useFilter } from './useFilter';

export const useColumn = (onFilter: (filter: Partial<TQueryFilter>) => void) => {
  const { getSearchProps } = useSearch(onFilter);
  const { getFilterProps } = useFilter(onFilter);
  
  return { getSearchProps, getFilterProps };
};
