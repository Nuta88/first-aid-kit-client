import dayjs from 'dayjs';
import {
  CheckIcon,
  CircleButton,
  Confirm,
  DeleteIcon,
  EditableNumberCell,
  Page,
  SpaceBetween,
  SyncIcon,
  Table,
  TooltipIconButton,
  UndoIcon
} from '../../components';
import { useColumn } from '../../hooks';
import { ICategory } from '../../types';
import { TAuditMedicine } from '../../types/audit';
import { replaceUnderscoreToSpace } from '../../utils/string';
import {
  getRowBackground,
  idDisabledReset
} from './helpers/helpers';
import { useAudit } from './hooks/useAudit';

const Audit = (): JSX.Element => {
  const {
    audits,
    selectedRowKeys,
    rowSelection,
    isLoading,
    search,
    onUpdateAudit,
    onSyncMedicines,
    onDeleteMedicine,
    onSearch,
    onClearSearch,
    onResetAudits
  } = useAudit();
  
  const { getSearchProps } = useColumn(onSearch);
  const tableTitle = `(Matched: ${audits.matched},
          Unmatched: ${audits.matched})
          of ${audits.total}`;
  
  return (
    <Page
      extra={[
        <Confirm
          title={`Are you sure to reset all current changed of audits?`}
          placement="leftTop"
          onConfirm={onResetAudits}
        >
          <TooltipIconButton
            loading={isLoading}
            tooltip="Reset changed of audits"
            size="large"
            icon={<UndoIcon />}
            data-testid="revert-btn"
            disabled={idDisabledReset(audits.items)}
          />
        </Confirm>,
        <Confirm
          title={`Are you sure to update amount of the all selected medicines?`}
          placement="leftTop"
          onConfirm={onSyncMedicines}
        >
          <TooltipIconButton
            loading={isLoading}
            tooltip="Sync selected medicines"
            size="large"
            icon={<SyncIcon />}
            data-testid="sync-btn"
            disabled={!selectedRowKeys.length}
          />
        </Confirm>
        ]
      }
    >
      <Table
        rowKey="id"
        size="small"
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        secondTitle={tableTitle}
        onClearFilter={onClearSearch}
        isDisabledFilter={!search}
        dataSource={audits.items}
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
            ...getSearchProps('name'),
            filteredValue: search ? [search] : null,
            render: (audit) => audit.name?.toUpperCase(),
          },
          {
            title: 'Category',
            key: 'category',
            render: (audit) => audit.categories.map((c: ICategory) => replaceUnderscoreToSpace(c.name)).join(', '),
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 90,
          },
          {
            title: 'New Amount',
            key: 'new_amount',
            width: 110,
            render: (audit) => <EditableNumberCell record={audit} dataIndex="new_amount" onSave={onUpdateAudit} />,
          },
          {
            title: 'Expiration date',
            render: (audit) => dayjs(audit['expiration_date']).format('MMMM D, YYYY'),
            key: 'expiration_date'
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
          },
          {
            title: 'Action',
            key: 'action',
            width: 120,
            render: (audit) => (
              <SpaceBetween size="middle">
                <TooltipIconButton
                  tooltip="Use amount for new amount"
                  size="middle"
                  type="default"
                  data-testid="add-medicine-btn"
                  icon={<CheckIcon />}
                  onClick={() => { onUpdateAudit({...audit, new_amount: audit.amount}); }}
                />
                <Confirm
                  title={`Are you sure to delete "${audit.name}"?`}
                  placement="leftTop"
                  onConfirm={() => { onDeleteMedicine(audit.id); }}
                >
                  <CircleButton type="primary" icon={<DeleteIcon />} disabled={audit.new_amount} />
                </Confirm>
              </SpaceBetween>
            ),
          }
        ]}
      />
    </Page>
  );
};

export default Audit;
