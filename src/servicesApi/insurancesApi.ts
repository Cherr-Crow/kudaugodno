import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getUserIdFromStore } from '@/rtk/storeAccess';
import { BASE_URL } from '@/temp/domen_nikita';
import { IInsurance } from '@/types/insurance';

import { getAccessToken } from './getAccessToken';

export const insurancesApi = createApi({
  reducerPath: 'insurancesApi',
  tagTypes: ['insurance'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getInsuranceData: build.query<IInsurance, void>({
      query: () => {
        const id = getUserIdFromStore();

        return {
          url: `insurances/${id}`,
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Данные страховок успешно получены!', data);
        } catch (error) {
          console.error('Ошибка при получении данных страховок:', error);
        }
      },
      providesTags: (result) =>
        result ? [{ type: 'insurance', id: result.id }] : [],
    }),
    updateInsurances: build.mutation<IInsurance, Omit<IInsurance, 'id'>>({
      query: (data) => {
        const id = getUserIdFromStore();

        return {
          url: `insurances/${id}/`,
          method: 'PUT',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: { id, ...data },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Страховки обновлены успешно!', data);
        } catch (error) {
          console.error('Ошибка при обновлении страховок:', error);
          console.log(arg);
        }
      },
      invalidatesTags: [{ type: 'insurance' }],
    }),
  }),
});

export const { useGetInsuranceDataQuery, useUpdateInsurancesMutation } =
  insurancesApi;
