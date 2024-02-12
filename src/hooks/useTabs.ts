import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router';
import { MedicineTabs } from '../constants/medicine';

export const useTabs = (tab: string) => {
  const navigate = useNavigate();
  const [ tabKey, setTabKey ] = useState(tab ?? 'medicine');
  const tabKeys: string[] = Object.values(MedicineTabs).filter((v) => isNaN(Number(v)));
  
  useEffect(() => {
    if (tab && !tabKeys.includes(tab)) navigate(-1);
  }, [tab, tabKey, navigate]);
  
  const changeTab = useCallback((key: string) => {
    setTabKey(key);
    navigate(`/${key}`);
  }, [navigate]);
  
  return { tabKey, setTabKey: changeTab };
}
