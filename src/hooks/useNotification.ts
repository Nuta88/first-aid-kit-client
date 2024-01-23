import { message } from 'antd';
import { ReactNode } from 'react';

import { NotificationType } from '../types';

export const useNotification = (): {
  notificationContext: ReactNode;
  openNotification: (type: NotificationType, content: string) => void
} => {
  const [ messageApi, contextHolder ] = message.useMessage();

  const openNotification = (type: NotificationType, content: string): void => {
    void messageApi.open({
      type,
      content
    });
  };

  return {
    notificationContext: contextHolder,
    openNotification
  };
};
