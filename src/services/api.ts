import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { Tokens } from '../types/auth';
import {
  createRefreshQueryArgs,
  getAccessToken,
  getRefreshToken,
  isUnauthorized,
  saveLoginTokens,
  saveTokensFromResponse
} from './helpers';
import { clearTokens } from '../storage/indexedDB';

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

const url = process.env.REACT_APP_BASE_URL;
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
  
    if (token && (!headers.get('Authorization')) ) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
});

const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType = (
  baseQuery
) => async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  
  const result = await baseQuery(args, api, extraOptions);
  await saveLoginTokens(api.endpoint, result.data as Tokens);
  
  if (isUnauthorized(result.error)) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      
      return await baseQuery(args, api, extraOptions);
    }
    
    const release = await mutex.acquire();
    try {
      const token = await getRefreshToken();
    
      if ( token ) {
        const refreshResult = await baseQuery(
          createRefreshQueryArgs(token),
          api,
          extraOptions
        );
      
      
        if ( refreshResult?.data ) {
          await saveTokensFromResponse(refreshResult.data as Tokens);
          
          return await baseQuery(args, api, extraOptions);
        }
        await clearTokens();
      }
    } finally {
      release();
    }
  }
  
  return result;
}

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth(baseQuery),
  tagTypes: [
    'Category',
    'Medicine',
    'ConstantlyStoredMedicine'
  ],
  endpoints: () => ({})
});

export default api;
