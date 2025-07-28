import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IInsurance } from '@/types/insurance';

export const insurancesApi = createApi({
  reducerPath: 'insurancesApi',
  tagTypes: ['insurance'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (build) => ({
    getInsuranceData: build.query<IInsurance, number>({
      query: (id) => {
        return {
          url: `insurances/${id}`,
          method: 'GET',
          headers: {
            accept: 'application/json',
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
    updateInsurances: build.mutation<
      IInsurance,
      { id: number; data: Omit<IInsurance, 'id'> }
    >({
      query: ({ id, data }) => {
        return {
          url: `insurances/${id}/`,
          method: 'PUT',
          headers: {
            accept: 'application/json',
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

export const {
  useGetInsuranceDataQuery,
  useLazyGetInsuranceDataQuery,
  useUpdateInsurancesMutation,
} = insurancesApi;
