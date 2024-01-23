import { useState } from 'react';

export const useModal = <T extends Partial<T>>(): {
  isOpenModal: boolean;
  content: T | null;
  hideModal: () => void;
  openModal: (content?: T) => void
} => {
  const [ isOpenModal, setIsShowing ] = useState<boolean>(false);
  const [ content, setContent ] = useState<T | null>(null);

  const hideModal = (): void => {
    if (content) setContent(null);

    setIsShowing(false);
  };

  const openModal = (content?: T): void => {
    if (content) setContent(content);

    setIsShowing(true);
  };

  return {
    isOpenModal,
    content,
    hideModal,
    openModal
  };
};
