import {
  FC,
  memo
} from 'react';
import {
  AddIcon,
  TooltipIconButton
} from '../../../../components';
import { MedicineTabs } from "../../../../constants/medicine";

interface IPageButtonProps {
  tabKey: string,
  openMedicineModal: () => void,
  openCSMModal: () => void,
}


const PageButton: FC<IPageButtonProps> = ({ tabKey, openMedicineModal, openCSMModal }) => {
  const isCSM = tabKey === MedicineTabs.MustHave;
  const title = isCSM ? 'Add medicine for permanent storage' : 'Add medicine';
  
  return (
    <TooltipIconButton
      tooltip={title}
      icon={<AddIcon />}
      data-testid="medicine-open-create-modal"
      onClick={isCSM ? openCSMModal : openMedicineModal}
    />
  )
};

export default memo(PageButton);
