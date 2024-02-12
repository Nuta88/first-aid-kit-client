import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  getTokens,
  saveTokens
} from '../storage/auth';
import { Tokens } from '../types/auth';

const tokenEndpoints = ['signup', 'signin'];

export const saveTokensFromResponse = async (data: Tokens) => {
  const { access_token, refresh_token, user=null } = data;
  if ( user ) localStorage.setItem('user', JSON.stringify(user));
  
  await saveTokens(access_token, refresh_token);
};

export const getAccessToken = async () => {
  return (await getTokens())['accessToken'];
};

export const getRefreshToken = async () => {
  return (await getTokens())['refreshToken'];
};

export const isUnauthorized = (error: FetchBaseQueryError | undefined) => {
  return error && error.status === 401
};

export const saveLoginTokens = async (endpoint: string, tokens: Tokens) => {
  if ( tokenEndpoints.some(te => te === endpoint) && tokens ) {
    await saveTokensFromResponse(tokens);
  }
};

export const createRefreshQueryArgs = (token: string) => {
  return {
    url: '/auth/refresh',
    headers: { authorization : `Bearer ${token}`}
  }
}
