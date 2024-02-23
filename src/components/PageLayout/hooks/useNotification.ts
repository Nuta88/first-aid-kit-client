import { notification } from 'antd';
import {
  ReactNode,
  useCallback
} from 'react';

export const useNotification = (): {
  notificationContext: ReactNode;
  openTopRightNotification: (title: string, description: string) => void
} => {
  const [ api, contextHolder ] = notification.useNotification();
  
  const openTopRightNotification = useCallback((title: string, description: string) => {
    api.info({
      message: title,
      description,
      placement: 'topRight',
    });
  }, []);
  
  return { notificationContext: contextHolder, openTopRightNotification };
}
