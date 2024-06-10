import { SearchOutlined } from '@ant-design/icons';
import {
  Input,
  InputRef
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef } from 'react';
import { colors } from '../../assets/colors';
import { Medicine } from '../../types/medicine';
import { TQueryFilter } from '../../types/query';

const { Search } = Input;

type DataIndex = keyof Medicine;

export const useSearch = (onFilter: (filter: Partial<TQueryFilter>) => void) => {
  const searchInput = useRef<InputRef>(null);
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
    clearFilters: (() => void) | undefined
  ) => {
    if ( clearFilters && !selectedKeys[0]) clearFilters();
    
    confirm();
    onFilter({[dataIndex]: selectedKeys[ 0 ]});
  };
  
  const getSearchProps = (dataIndex: DataIndex): ColumnType<Medicine> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Search
          enterButton
          ref={searchInput}
          allowClear
          placeholder={`Search ${dataIndex.toString()}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onSearch={(key) => handleSearch([key], confirm, dataIndex, clearFilters)}
          style={{ marginBottom: 8 }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? colors.primary : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    }
  });
  
  return { getSearchProps };
};
