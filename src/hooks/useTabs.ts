import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import { apiUrls } from '../constants/apiUrls';
import { MedicineTabs } from '../constants/medicine';

export const useTabs = () => {
  const navigate = useNavigate();
  const { tab = 'medicine' } = useParams();
  const [ tabKey, setTabKey ] = useState(tab ?? 'medicine');
  const tabKeys: string[] = Object.values(MedicineTabs).filter((v) => isNaN(Number(v)));
  
  useEffect(() => {
    if (tab && !tabKeys.includes(tab)) navigate(-1);
  }, [tab, tabKey, navigate]);
  
  const changeTab = useCallback((key: string) => {
    setTabKey(key);
    
    navigate(key === MedicineTabs.Medicine ? apiUrls.medicine.root : `${apiUrls.medicine.root}/${key}`);
  }, [navigate]);
  
  return { tabKey, setTabKey: changeTab };
}
