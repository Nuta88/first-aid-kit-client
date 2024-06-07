import {
  Input,
  Menu
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import {
  ChangeEvent,
  useState
} from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  SpaceAround
} from '../../components';
import { Option } from '../../types/form';
import { Medicine } from '../../types/medicine';
import { TQueryFilter } from '../../types/query';

type DataIndex = keyof Medicine;

const CheckboxStyled = styled(Checkbox)`
  float: left;
  padding-right: .25rem
`;
const ButtonStyled = styled(Button)`
  width: 5.6rem;
`;

export const useFilter = (onFilter: (filter: Partial<TQueryFilter>) => void) => {
  const [ options, setOptions ] = useState<Option[]>([]);
  const [ filterKeys, setFilterKeys ] = useState<string[]>([]);
  
  const handleFilter = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
    onFilter({[dataIndex]: selectedKeys});
  };
  
  const handleCheck = (selectedKeys: string[], value: string, setSelectedKeys: (selectedKeys: React.Key[]) => void) => {
    return selectedKeys.includes(value) ?
      setSelectedKeys(selectedKeys.filter(k => k !== value)) :
      setSelectedKeys([...selectedKeys, value]);
  };
  
  const handleSetOptions = (e: ChangeEvent<HTMLInputElement>, list: Option[], selectedKeys: string[]) => {
    const filteredOptions = list.filter(item => item.label.toLowerCase().includes(e.target.value.toLowerCase()));
    
    setOptions(filteredOptions);
    if (selectedKeys.length) setFilterKeys(selectedKeys);
  };
  
  const handleClear = (clearFilters:  (() => void) | undefined, list: Option[], dataIndex: DataIndex) => {
    if ( clearFilters ) clearFilters();
    
    setOptions(list);
    setFilterKeys([]);
    onFilter({[dataIndex]: []});
  };
  
  const getFilterProps = (dataIndex: DataIndex, list= []): ColumnType<Medicine> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const menuItems = options.length ? options : list;
      
      if (!selectedKeys.length && filterKeys.length && list.length) setSelectedKeys(filterKeys);

      const onClearFilters = () => handleClear(clearFilters, list, dataIndex);
      
      const onFilter = () => handleFilter(selectedKeys as string[], confirm, dataIndex);
      
      const onSetOptions = (e: ChangeEvent<HTMLInputElement>): void => handleSetOptions(e, list, selectedKeys as string[]);
      
      return (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            allowClear
            placeholder={`Search ${dataIndex.toString()}`}
            onChange={onSetOptions}
          />
          <Menu
            multiple
            selectedKeys={selectedKeys as string[]}
          >
            {menuItems.map((item: Option) => (
              <Menu.Item
                key={item.value}
                onClick={() => handleCheck(selectedKeys as string[], item.value, setSelectedKeys)}
              >
                <CheckboxStyled checked={selectedKeys.includes(item.value)} />
                {item.label.toUpperCase()}
              </Menu.Item>
            ))}
          </Menu>
          <SpaceAround>
            <ButtonStyled
              type="primary"
              size="small"
              onClick={onFilter}
            >
              Ok
            </ButtonStyled>
            <ButtonStyled size="small" onClick={onClearFilters}>
              Reset
            </ButtonStyled>
          </SpaceAround>
        </div>
      )
    }
  });
  
  return { getFilterProps };
};
