import { apiUrls } from '../constants/apiUrls';
import { ICategory } from '../types';
import { Medicine } from "../types/medicine";

import api from './api';

const categoryApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchCategory: builder.query<ICategory[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.category.root,
        params
      }),
      providesTags: [ 'Category' ]
    }),
    createCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: ({ ...body }) => ({
        url: apiUrls.category.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Category' ]
    }),
    updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (body) => ({
        url: apiUrls.category.withId(body.id as number),
        method: 'PATCH',
        body
      }),
      invalidatesTags: [ 'Category' ]
    }),
    deleteCategory: builder.mutation<Medicine, number>({
      query: (id, ...params) => ({
        url: apiUrls.category.withId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'Category' ]
    })
  }),
  overrideExisting: false,
});


export const {
  useFetchCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
