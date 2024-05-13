import {
  Table as AntdTable,
  TableProps
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { TextButton } from '../Buttons/TextButton';
import { SpaceBetween } from '../Space/SpaceBetween';
import { SecondaryText } from '../Typography/SecondaryText';

interface ITableProps {
  secondTitle?: string | null,
  children?: ReactNode,
  onClearFilter?: () => void,
  isDisabledFilter?: boolean
}

const TableStyled = styled(AntdTable)`
  .selected-row {
    background-color: rgba(236,165,165,0.43);
  }
  .ant-spin-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 18rem);
  }
  .ant-table {
    flex-grow: 1;
    .ant-table-title {
      padding: 0 0 .6rem;
      text-transform: uppercase;
      color: #1c3463e0;
    }
  }
  .ant-table-thead {
    .ant-table-cell {
      padding: 1rem 8px!important;
      background: #7b91bc21;
      color: #384d76;
    }
  }
`;

const Table = ({isDisabledFilter = true, secondTitle, onClearFilter, ...props}: JSX.IntrinsicAttributes & TableProps<any> & ITableProps): JSX.Element => (
  <>
    <SpaceBetween size="middle">
      <SecondaryText>
        {secondTitle}
      </SecondaryText>
      {onClearFilter && <TextButton onClick={onClearFilter} disabled={isDisabledFilter}>Clear filters</TextButton>}
    </SpaceBetween>
    <TableStyled {...props} />
  </>
);

export { Table, ColumnsType };
