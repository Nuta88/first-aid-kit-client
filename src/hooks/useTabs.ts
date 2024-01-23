import {
  useCallback,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router";
import { tabKeys } from "../constants/medicine";

export const useTabs = (tab: string) => {
  const navigate = useNavigate();
  const [ tabKey, setTabKey ] = useState(tab ?? 'medicine');
  
  useEffect(() => {
    if (tab && !tabKeys.includes(tab)) navigate(-1);
  }, [tab, tabKey, navigate]);
  
  const changeTab = useCallback((key: string) => {
    setTabKey(key);
    navigate(`/${key}`);
  }, []);
  
  return { tabKey, setTabKey: changeTab };
}
