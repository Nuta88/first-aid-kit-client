import {
  Modal,
  ModalProps
} from 'antd';
import { ReactElement } from 'react';

interface BasicModalProps {
  title: string;
  isOpen: boolean;
  children: ReactElement;
  onSave?: () => void;
  onCancel: () => void
}

export const BasicModal = ({ title, isOpen, children, onSave, onCancel, ...props }: BasicModalProps & ModalProps): JSX.Element => (
  <Modal
    title={title}
    open={isOpen}
    onOk={onSave}
    onCancel={onCancel}
    {...props}
  >
    {children}
  </Modal>
);
