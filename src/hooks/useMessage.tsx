import { useContext } from 'react';
import { MessageContext } from '../context';

export const useMessage = () => {
  // @ts-ignore
  const { onSuccess, onError, onWarning, openTopRightNotification } = useContext(MessageContext);
  
  return { onSuccess, onError, onWarning, openTopRightNotification };
}
