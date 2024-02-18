import dayjs from 'dayjs';
import {
  Page,
  SyncIcon,
  Table,
  TooltipIconButton
} from '../../components';
import { useAudit } from '../../hooks';
import { ICategory } from '../../types';
import { TAuditMedicine } from '../../types/audit';
import { replaceUnderscoreToSpace } from '../../utils/string';
import EditableCell from './components/EditableCell';
import { getRowBackground } from "./helpers/helpers";

const Audit = (): JSX.Element => {
  const {
    medicines,
    selectedRowKeys,
    isLoading,
    onUpdateAudit,
    onSyncMedicines,
    onSelectAudits
  } = useAudit();
  
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      onSelectAudits(selectedRowKeys);
    },
    getCheckboxProps: (record: TAuditMedicine) => ({
      disabled: record.isCorrect,
      name: record.name,
    }),
  };
  
  return (
    <Page
      extra={
        <TooltipIconButton
          loading={isLoading}
          tooltip="Sync"
          size="large"
          icon={<SyncIcon />}
          data-testid="sync-btn"
          disabled={!selectedRowKeys.length}
          onClick={onSyncMedicines}
        />
      }
    >
      <Table
        rowKey="id"
        size="small"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        dataSource={medicines}
        scroll={{ y: 350 }}
        onRow={(record: TAuditMedicine) => ({
          style: {
            background: getRowBackground(record),
          }
        })}
        columns={[
          {
            title: 'Name',
            key: 'name',
            render: (medicine) => medicine.name?.toUpperCase(),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['ascend'],
          },
          {
            title: 'Category',
            key: 'category',
            render: (medicine) => medicine.categories.map((c: ICategory) => replaceUnderscoreToSpace(c.name)).join(', '),
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
          },
          {
            title: 'New Amount',
            key: 'new_amount',
            render: (medicine) => <EditableCell record={medicine} dataIndex="new_amount" onSave={onUpdateAudit} />,
          },
          {
            title: 'Expiration date',
            render: (medicine) => dayjs(medicine['expiration_date']).format('MMMM D, YYYY'),
            key: 'expiration_date'
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
          }
        ]}
      />
    </Page>
  );
};

export default Audit;
