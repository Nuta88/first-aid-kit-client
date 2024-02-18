import { apiUrls } from '../constants/apiUrls';
import {
  Medicine,
  TMedicine
} from "../types/medicine";

import api from './api';

const medicineApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchMedicine: builder.query<TMedicine[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.medicine.root,
        params
      }),
      providesTags: [ 'Medicine' ]
    }),
    fetchExpiredMedicine: builder.query<Medicine[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.medicine.expired,
        params
      }),
      providesTags: [ 'Medicine' ]
    }),
    createMedicine: builder.mutation<Medicine, Partial<Medicine>>({
      query: ({ ...body }) => ({
        url: apiUrls.medicine.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Medicine' ]
    }),
    updateMedicine: builder.mutation<Medicine, Partial<Medicine>>({
      query: (body) => ({
        url: apiUrls.medicine.withId(body.id as number),
        method: 'PATCH',
        body
      }),
      invalidatesTags: [ 'Medicine' ]
    }),
    updateMedicines: builder.mutation<Medicine[], Partial<Medicine[]>>({
      query: (body) => ({
        url: apiUrls.medicine.bulkUpdate,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Medicine' ]
    }),
    deleteMedicine: builder.mutation<Medicine, number>({
      query: (id, ...params) => ({
        url: apiUrls.medicine.withId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'Medicine' ]
    })
  }),
  overrideExisting: false,
});


export const {
  useFetchMedicineQuery,
  useFetchExpiredMedicineQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useUpdateMedicinesMutation,
  useDeleteMedicineMutation
} = medicineApi;
