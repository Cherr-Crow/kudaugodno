import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IWzhuh } from '@/types/wzhuh';

export const wzhuhApi = createApi({
  reducerPath: 'wzhuhApi',
  tagTypes: ['wzhuh'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getWzhuh: build.query<IWzhuh, string | number>({
      query: (body) => {
        const isCity = typeof body === 'string';
        const queryParam = isCity
          ? `departure_city=${encodeURIComponent(body)}`
          : `id=${body}`;

        return {
          url: `/vzhuhs/?${queryParam}`,
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Вжух получен!', data);
        } catch (error) {
          console.error('Ошибка при получении вжуха:', error);
        }
      },
    }),
  }),
});

export const { useLazyGetWzhuhQuery } = wzhuhApi;
