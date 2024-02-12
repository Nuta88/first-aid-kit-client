import {
  FC,
  memo,
  useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddIcon,
  AuditIcon,
  TooltipIconButton
} from '../../../../components';
import { MedicineTabs } from "../../../../constants/medicine";

interface IPageButtonProps {
  tabKey: string,
  openMedicineModal: () => void,
  openCSMModal: () => void,
}

const LogoStyled = styled(TooltipIconButton)`
  margin-right: .6rem;
`;

const PageButton: FC<IPageButtonProps> = ({ tabKey, openMedicineModal, openCSMModal }) => {
  const navigate = useNavigate();
  const isCSM = tabKey === MedicineTabs.MustHave;
  const title = isCSM ? 'Add medicine for permanent storage' : 'Add medicine';
  
  const handleAudit = useCallback(async () => {
    navigate('/audit');
  }, [ navigate ]);
  
  return (
    <>
      {
      tabKey === MedicineTabs.Medicine && (
        <LogoStyled
          tooltip="Audit medicines"
          icon={<AuditIcon />}
          data-testid="audit-btn"
          onClick={handleAudit}
        />
      )
    }
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
