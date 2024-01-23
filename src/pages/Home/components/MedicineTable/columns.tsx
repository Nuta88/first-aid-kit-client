import dayjs from 'dayjs';
import {
  AddIcon,
  CircleButton,
  ColumnsType,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  TooltipIconButton
} from '../../../../components';
import { ICategory } from '../../../../types';
import {
  ConstantlyStoredMedicine,
  Medicine
} from '../../../../types/medicine';
import { generateOptions } from '../../../../utils/form';
import { replaceUnderscoreToSpace } from '../../../../utils/string';

export const generateColumns = (
  constantlyStoredMedicines: ConstantlyStoredMedicine[],
  categories: ICategory[],
  onDelete: (id: number) => void,
  showModal: (medicine: any) => void,
  showCSMModal: (medicine: any) => void,
  getColumnSearchProps: any,
  getFilterProps: any
): ColumnsType<any> => [
  {
    title: 'Name',
    key: 'name',
    ...getColumnSearchProps('name'),
    render: (medicine) => medicine.name?.toUpperCase(),
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['ascend'],
  },
  {
    title: 'Category',
    key: 'category',
    render: (medicine) => medicine.categories.map((c: ICategory) => replaceUnderscoreToSpace(c.name)).join(', '),
    ...getFilterProps('categories', generateOptions(categories, 'id', 'name'))
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
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
    title: 'Action',
    key: 'action',
    width: 150,
    render: (_, medicine: Medicine) => (
      <SpaceBetween size="middle">
        <TooltipIconButton
          tooltip="Add medicine for permanent storage"
          size="middle"
          type="default"
          data-testid="add-medicine-btn"
          icon={<AddIcon />}
          disabled={constantlyStoredMedicines.some((csm: ConstantlyStoredMedicine) => csm.name === medicine.name)}
          onClick={() => {
            showCSMModal(new ConstantlyStoredMedicine(medicine.name, medicine.categories, medicine.description));
          }}
        />
        <CircleButton
          data-testid="edit-medicine-btn"
          icon={<EditIcon />}
          type="primary"
          onClick={() => { showModal(medicine); }}
        />
        <Confirm
          title={`Are you sure to delete "${medicine.name}"?`}
          placement="leftTop"
          onConfirm={() => { onDelete(medicine.id as number); }}
        >
          <CircleButton type="primary" icon={<DeleteIcon />} />
        </Confirm>
      </SpaceBetween>
    )
  }
];
