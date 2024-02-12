import dayjs from 'dayjs';
import {
  CheckIcon,
  Page,
  SpaceBetween,
  SyncIcon,
  Table,
  TooltipIconButton
} from '../../components';
import { useAudit } from '../../hooks';
import { ICategory } from '../../types';
import { TAuditMedicine } from '../../types/audit';
import { replaceUnderscoreToSpace } from '../../utils/string';
import EditableCell from './components/EditableCell';

const Audit = (): JSX.Element => {
  const { medicines, updateAudit, onAudit, onUpdateMedicine } = useAudit();
  
  return (
    <Page
      extra={
        <TooltipIconButton
          tooltip="Sync"
          size="large"
          icon={<SyncIcon />}
          data-testid="sync-btn"
          onClick={onAudit}
        />
      }
    >
      <Table
        rowKey="id"
        size="small"
        dataSource={medicines}
        scroll={{ y: 350 }}
        onRow={(record: TAuditMedicine) => ({
          style: {
            background: !record.isCorrect ? 'rgba(236,165,165,0.43)' : 'default',
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
            render: (medicine) => <EditableCell record={medicine} dataIndex="new_amount" onSave={updateAudit} />,
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
          },
          {
            title: '',
            key: 'action',
            width: 150,
            render: (_, medicine: TAuditMedicine) => (
              <SpaceBetween size="middle">
                <TooltipIconButton
                  type="primary"
                  tooltip="Update medicine"
                  size="middle"
                  data-testid="update-medicine-btn"
                  icon={<CheckIcon />}
                  disabled={medicine.isCorrect}
                  onClick={() => {onUpdateMedicine(medicine)}}
                />
              </SpaceBetween>
            )
          }
        ]}
      />
    </Page>
  );
};

export default Audit;
