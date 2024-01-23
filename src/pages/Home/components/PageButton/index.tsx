import {
  FC,
  memo
} from 'react';
import {
  AddIcon,
  TooltipIconButton
} from '../../../../components';

interface IPageButtonProps {
  tabKey: string,
  openMedicineModal: () => void,
  openCSMModal: () => void,
}

const PageButton: FC<IPageButtonProps> = ({ tabKey, openMedicineModal, openCSMModal }) => {
  const isCSM = tabKey === 'must-have';
  console.log(tabKey, 'jhjkhjk');
  const title = isCSM ? 'Add medicine for permanent storage' : 'Add medicine';
  
  return (
    <>
      <TooltipIconButton
        tooltip={title}
        icon={<AddIcon />}
        data-testid="medicine-open-create-modal"
        onClick={isCSM ? openCSMModal : openMedicineModal}
      />
    </>
  )
};

export default memo(PageButton);
