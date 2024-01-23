import {
  FC,
  memo
} from 'react';

import {
  AddIcon,
  CircleButton,
  Confirm,
  DeleteIcon,
  EditIcon,
  SpaceBetween,
  Table,
  TooltipIconButton
} from '../../../../components';
import {
  useDeleteConstantlyStoredMedicineMutation,
  useFetchConstantlyStoredMedicineQuery
} from '../../../../services/constantlyStoredMedicine';
import {
  ConstantlyStoredMedicine,
  ICategory,
  IConstantlyStoredMedicine,
  Medicine
} from '../../../../types/medicine';
import {
  convertDateToString,
  today
} from '../../../../utils/date';
import { replaceUnderscoreToSpace } from '../../../../utils/string';

interface IMedicineTableProps {
  onOpenMedicineModal: (medicine?: Medicine) => void;
   openModal: (param?: ConstantlyStoredMedicine) => void;
}

const CSMTable: FC<IMedicineTableProps> = ({ openModal, onOpenMedicineModal }) => {
  const { data: medicines = [] } = useFetchConstantlyStoredMedicineQuery({});
  const [ deleteConstantlyStoredMedicine ] = useDeleteConstantlyStoredMedicineMutation({});
  
  const handleDelete = (id: number) => {
    deleteConstantlyStoredMedicine(id);
  };
  const handleOpenModal = (medicine?: IConstantlyStoredMedicine | null) => {
    if ( medicine ) return  openModal(medicine);
    
    openModal();
  };
  
  const handleOpenMedicineModal = (med: any) => {
    const { name, categories, description } = med;
    
    onOpenMedicineModal(new Medicine(name, categories, 1, convertDateToString(today), description));
  };
  
  return (
    <>
      <Table
        rowKey="id"
        size="small"
        dataSource={medicines}
        scroll={{ y: 350 }}
        onRow={(record: IConstantlyStoredMedicine) => ({
          style: {
            background: record.isMissing ? 'rgba(236,165,165,0.43)' : 'default',
          }
        })}
        columns={[
          {
            title: 'Name',
            key: 'name',
            render: (category) => category.name?.toUpperCase()
          },
          {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority'
          },
          {
            title: 'Category',
            key: 'category',
            render: (medicine) => medicine.categories.map((c: ICategory) => replaceUnderscoreToSpace(c.name)).join(', ')
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
            render: (_, medicine: IConstantlyStoredMedicine) => (
              <SpaceBetween size="middle">
                <TooltipIconButton
                  tooltip="Add medicine"
                  size="middle"
                  icon={<AddIcon />}
                  onClick={() => handleOpenMedicineModal(medicine)}
                />
                <CircleButton
                  icon={<EditIcon />}
                  type="primary"
                  onClick={() => { handleOpenModal(medicine); }}
                />
                <Confirm
                  title={`Are you sure to delete "${medicine.name}"?`}
                  placement="leftTop"
                  onConfirm={() => { handleDelete(medicine.id as number); }}
                >
                  <CircleButton type="primary" icon={<DeleteIcon />} />
                </Confirm>
              </SpaceBetween>
            )
          }
        ]}
      />
    </>
  );
};

export default memo(CSMTable);
