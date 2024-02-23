import { message } from 'antd';
import { useCallback } from 'react';

export const useMessage = () => {
  const [ messageApi, contextHolder ] = message.useMessage();
  
  const onSuccess = useCallback((content: string) => {
    messageApi.open({
      type: 'success',
      content,
    });
  }, [ messageApi ]);
  
  const onError = useCallback((content: string) => {
    messageApi.open({
      type: 'error',
      content,
    });
  }, [ messageApi ]);
  
  const onWarning = useCallback((content: string) => {
    messageApi.open({
      type: 'warning',
      content,
    });
  }, [ messageApi ]);
  
  return { messageContext: contextHolder, onSuccess, onError, onWarning };
}
