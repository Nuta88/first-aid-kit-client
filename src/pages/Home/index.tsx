import { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  Page,
  Tabs
} from '../../components';
import {
  useModal,
  useQueryFilters,
  useTabs
} from '../../hooks';
import { useFetchConstantlyStoredMedicineQuery } from '../../services/constantlyStoredMedicine';
import {
  useCreateMedicineMutation,
  useFetchExpiredMedicineQuery,
  useFetchMedicineQuery,
  useUpdateMedicineMutation
} from '../../services/medicine';
import {
  IConstantlyStoredMedicine,
  Medicine
} from '../../types/medicine';
import { getTitleCount } from '../../utils/medicine';
import CSMModal from './components/CSMModal';
import CSMTable from './components/CSMTable';
import MedicineModal from './components/MedicineModal';
import MedicineTable from './components/MedicineTable';
import PageButton from './components/PageButton';

const Home = (): JSX.Element => {
  const { tab = 'medicine' } = useParams();
  const { tabKey, setTabKey } = useTabs(tab ?? 'medicine');
  const { query: expiredMedicineQuery, setQuery: setExpiredMedicineQuery } = useQueryFilters();
  const { query: medicineQuery, setQuery: setMedicineQuery } = useQueryFilters();
  const { isOpenModal, hideModal, content: medicine, openModal } = useModal<Medicine>();
  const {
    isOpenModal: isOpenCSMModal,
    content: selectedCSM,
    openModal: openCSMModal,
    hideModal: hideCSMModal
  } = useModal<IConstantlyStoredMedicine>();
  const { data: medicines = [], isFetching: isFetchingMedicine } = useFetchMedicineQuery(medicineQuery);
  const { data: expiredMedicines = [], isFetching: isFetchingExpiredMedicines } = useFetchExpiredMedicineQuery(expiredMedicineQuery);
  const { data: csMedicines = [], isFetching: isFetchingCSMedicines } = useFetchConstantlyStoredMedicineQuery({});
  const [ createMedicine ] = useCreateMedicineMutation();
  const [ updateMedicine ] = useUpdateMedicineMutation({});
  
  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, []);
  
  const handleOpenCSMModal = useCallback(() => {
    openCSMModal();
  }, []);
  
  const handleCreateOrUpdate = useCallback((med: Medicine) => {
    if ( medicine ) {
      updateMedicine(med);
      return;
    }
  
    createMedicine(med);
  }, [medicine]);
  
  return (
    <Page
      isLoading={isFetchingMedicine || isFetchingExpiredMedicines || isFetchingCSMedicines}
      extra={
        <PageButton
          tabKey={tabKey}
          openMedicineModal={handleOpenCreateModal}
          openCSMModal={handleOpenCSMModal}
        />
    }>
      <Tabs
        defaultActiveKey={tabKey}
        onChange={setTabKey}
        items={[
          {
            label: 'Existing',
            key: 'medicine',
            children: (
              <MedicineTable
                medicines={medicines}
                onSearch={setMedicineQuery}
                openModal={openModal}
              />
            ),
          },
          {
            label: `Expired${getTitleCount(expiredMedicines)}`,
            key: 'expired',
            children: (
              <MedicineTable
                medicines={expiredMedicines}
                onSearch={setExpiredMedicineQuery}
                openModal={openModal}
              />
            ),
            disabled: !expiredMedicines.length
          },
          {
            label: `Must-Have${getTitleCount(csMedicines.filter(csm => csm.isMissing))}`,
            key: 'must-have',
            children: <CSMTable openModal={openCSMModal} onOpenMedicineModal={openModal} />
          },
        ]}
      />
      {isOpenModal && <MedicineModal
        isOpen={isOpenModal}
        medicine={medicine}
        onCreate={handleCreateOrUpdate}
        onCancel={hideModal}
      />}
      {isOpenCSMModal && <CSMModal
        isOpen={isOpenCSMModal}
        medicine={selectedCSM}
        onCancel={hideCSMModal}
      />}
    </Page>
  );
};

export default Home;
