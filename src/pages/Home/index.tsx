import { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  Page,
  Tabs
} from '../../components';
import {
  useModal,
  useTabs
} from '../../hooks';
import {
  useCreateMedicineMutation,
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
import { useFetchMedicines } from './hooks/useFetchMedicines';

const Home = (): JSX.Element => {
  const { tab = 'medicine' } = useParams();
  const { tabKey, setTabKey } = useTabs(tab ?? 'medicine');
  const {
    isLoading,
    medicines,
    csMedicines,
    expiredMedicines,
    setExpiredMedicineQuery,
    setMedicineQuery
  } = useFetchMedicines();
  const { isOpenModal, hideModal, content: medicine, openModal } = useModal<Medicine>();
  const {
    isOpenModal: isOpenCSMModal,
    content: selectedCSM,
    openModal: openCSMModal,
    hideModal: hideCSMModal
  } = useModal<IConstantlyStoredMedicine>();
  const [ createMedicine ] = useCreateMedicineMutation();
  const [ updateMedicine ] = useUpdateMedicineMutation({});
  
  const handleOpenCreateModal = useCallback(() => {
    openModal();
  }, []);
  
  const handleOpenCSMModal = useCallback(() => {
    openCSMModal();
  }, []);
  
  return (
    <Page
      isLoading={isLoading}
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
                onUpdate={updateMedicine}
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
                onUpdate={updateMedicine}
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
        onCreate={createMedicine}
        onUpdate={updateMedicine}
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
