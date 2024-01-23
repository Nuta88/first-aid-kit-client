import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Input,
  InputRef,
  Menu,
  Space
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef } from 'react';
import { Medicine } from '../types/medicine';
import { TQueryFilter } from "../types/query";

const { Search } = Input;

type DataIndex = keyof Medicine;

type MenuItem = {
  value: string,
  label: string
}
export const useColumn = (onFilter: (filter: Partial<TQueryFilter>) => void) => {
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
  const handleFilter = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    onFilter({[dataIndex]: selectedKeys});
  };
  
  const handleCheck = (
    selectedKeys: string[],
    value: string,
    setSelectedKeys: (selectedKeys: React.Key[]) => void
  ) => {
    return selectedKeys.includes(value) ?
      setSelectedKeys(selectedKeys.filter(k => k !== value)) :
      setSelectedKeys([...selectedKeys, value]);
  };
  
  
  const getSearchProps = (dataIndex: DataIndex): ColumnType<Medicine> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Search
          enterButton
          ref={searchInput}
          allowClear
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onSearch={(key) => handleSearch([key], confirm, dataIndex, clearFilters)}
          style={{ marginBottom: 8 }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#880808' : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });
  const getFilterProps = (dataIndex: DataIndex, list=[]): ColumnType<Medicine> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Menu
          multiple
          selectedKeys={selectedKeys as string[]}
        >
          {list.map((item: MenuItem) => (
            <Menu.Item
              key={item.value}
              onClick={() => handleCheck(selectedKeys as string[], item.value, setSelectedKeys)}
            >
              <Checkbox
                style={{ float: 'left', paddingRight: '4px' }}
                checked={selectedKeys.includes(item.value)}>
              </Checkbox>
              {item.label.toUpperCase()}
            </Menu.Item>
          ))}
        </Menu>
        <Space style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
          <Button
            type="primary"
            size="small"
            style={{ width: 90 }}
            onClick={() => handleFilter(selectedKeys as string[], confirm, dataIndex)}
          >
            Ok
          </Button>
          <Button
            onClick={clearFilters}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterSearch: true
  });
  
  return { getSearchProps, getFilterProps };
};
