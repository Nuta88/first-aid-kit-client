import {
  FC,
  memo
} from 'react';

import {
  ColumnsType,
  Table
} from '../../../../components';
import {
  useColumn,
  useModal
} from '../../../../hooks';
import { useFetchCategoryQuery } from '../../../../services/category';
import { useFetchConstantlyStoredMedicineQuery } from '../../../../services/constantlyStoredMedicine';
import { useDeleteMedicineMutation } from '../../../../services/medicine';
import {
  IConstantlyStoredMedicine,
  Medicine
} from '../../../../types/medicine';
import { TQueryFilter } from '../../../../types/query';
import { isObjectEmpty } from '../../../../utils/object';
import CSMModal from '../CSMModal';
import { getTableRowColor } from '../helpers';
import { generateColumns } from './columns';

interface IMedicineTableProps {
  medicines: Medicine[];
  filter: Partial<TQueryFilter>;
  openModal: (medicine?: Medicine) => void;
  onUpdate: (medicine: Medicine) => void;
  onSearch: (param: Partial<TQueryFilter>) => void;
}

const MedicineTable: FC<IMedicineTableProps> = ({ medicines, filter, onSearch, onUpdate, openModal }) => {
  const { data: csm = [] } = useFetchConstantlyStoredMedicineQuery({});
  const { data: categories = [] } = useFetchCategoryQuery({});
  const [ deleteMedicine ] = useDeleteMedicineMutation({});
  const { isOpenModal: isOpenCSMModal, content: csmSelected, openModal: openCSMModal, hideModal:  hideCSMModal} = useModal<IConstantlyStoredMedicine>();
  const { getSearchProps, getFilterProps } = useColumn(onSearch);
  const columns: ColumnsType<any> = generateColumns(
    csm,
    categories,
    filter,
    deleteMedicine,
    onUpdate,
    openModal,
    openCSMModal,
    getSearchProps,
    getFilterProps
  );
 
  return (
    <>
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={medicines}
        onRow={(record: Medicine) => ({
          style: {
            background: getTableRowColor(record['expiration_date']),
          }
        })}
        onClearFilter={()=> onSearch({})}
        isDisabledFilter={isObjectEmpty(filter)}
        scroll={{ y: 340 }}
      />
      {isOpenCSMModal && <CSMModal
        isOpen={isOpenCSMModal}
        medicine={csmSelected}
        onCancel={hideCSMModal}
      />}
    </>
  );
};

export default memo(MedicineTable);
