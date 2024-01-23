import { apiUrls } from '../constants/apiUrls';
import {
  IUserLogin,
  Tokens
} from "../types/auth";
import { User } from "../types/user";
import api from './api';

const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<Tokens, Partial<User>>({
      query: ({ ...body }) => ({
        url: apiUrls.auth.signup,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Auth' ]
    }),
    signin: builder.mutation<Tokens, Partial<IUserLogin>>({
      query: ({ ...body }) => ({
        url: apiUrls.auth.signin,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Auth' ]
    }),
  }),
  overrideExisting: false,
});


export const {
  useSigninMutation,
  useSignupMutation
} = categoryApi;
