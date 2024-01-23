import { apiUrls } from '../constants/apiUrls';
import {
  ConstantlyStoredMedicine,
  IConstantlyStoredMedicine,
  Medicine
} from "../types/medicine";

import api from './api';

const constantlyStoredMedicineApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchConstantlyStoredMedicine: builder.query<IConstantlyStoredMedicine[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.constantlyStoredMedicine.root,
        params
      }),
      providesTags: [ 'ConstantlyStoredMedicine' ]
    }),
    createConstantlyStoredMedicine: builder.mutation<ConstantlyStoredMedicine, Partial<ConstantlyStoredMedicine>>({
      query: ({ ...body }) => ({
        url: apiUrls.constantlyStoredMedicine.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'ConstantlyStoredMedicine' ]
    }),
    updateConstantlyStoredMedicine: builder.mutation<ConstantlyStoredMedicine, Partial<Medicine>>({
      query: (body) => ({
        url: apiUrls.constantlyStoredMedicine.withId(body.id as number),
        method: 'PATCH',
        body
      }),
      invalidatesTags: [ 'ConstantlyStoredMedicine' ]
    }),
    deleteConstantlyStoredMedicine: builder.mutation<ConstantlyStoredMedicine, number>({
      query: (id, ...params) => ({
        url: apiUrls.constantlyStoredMedicine.withId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'ConstantlyStoredMedicine' ]
    })
  }),
  overrideExisting: false,
});


export const {
  useFetchConstantlyStoredMedicineQuery,
  useCreateConstantlyStoredMedicineMutation,
  useUpdateConstantlyStoredMedicineMutation,
  useDeleteConstantlyStoredMedicineMutation
} = constantlyStoredMedicineApi;
