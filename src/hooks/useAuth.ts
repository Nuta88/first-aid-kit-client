import { useCallback } from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';

import { authorizedPaths } from '../constants/apiUrls';
import { useSigninMutation, useSignupMutation } from '../services/auth';
import { clearTokens } from '../storage/indexedDB';

export const useAuth = <T extends Partial<T>>(): {
  isUserAuthorized: boolean;
  isAuthorizedPaths: boolean;
  onLogin: (user: T) => void;
  onRegister: (user: T) => void;
  onLogout: () => void
} => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [ signin ] = useSigninMutation();
  const [ signup ] = useSignupMutation();
  
  const onLogin = useCallback((user: T): void => {
    signin(user).then(() => {
      navigate('/');
    });
  }, []);

  const onRegister = useCallback((user: T): void => {
    console.log(user, 'onRegister');
    signup(user).then(() => {
      navigate('/');
    });
  }, []);

  const onLogout = useCallback((): void => {
    localStorage.setItem('user', '');
    clearTokens();
    navigate('/login');
  }, []);
  
  
  return {
    isUserAuthorized: !!localStorage.getItem('user'),
    isAuthorizedPaths: authorizedPaths.includes(pathname),
    onLogin,
    onRegister,
    onLogout
  };
};
