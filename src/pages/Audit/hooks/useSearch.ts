import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  getSearchFilter,
  saveSearchedAuditFilter
} from '../../../storage/audit';
import { TQueryFilter } from "../../../types/query";

export const useSearch = () => {
  const [ search, setSearch ] = useState('');
  
  useEffect(() => {
    async function fetchFilter() {
      const filter = await getSearchFilter();
    
      if ( filter ) setSearch(filter);
    }
  
    fetchFilter();
  }, []);
  
  const onSearch = useCallback(async ({name = ''}: Partial<TQueryFilter>) => {
    await saveSearchedAuditFilter(name);

    setSearch(name);
  }, []);
  
  const onClearSearch = useCallback(async () => {
    await saveSearchedAuditFilter('');

    setSearch('');
  }, []);
  
  return {
    search,
    onSearch,
    onClearSearch
  };
}
