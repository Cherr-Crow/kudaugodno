import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';

export interface IDiscount {
  id: number;
  active_stock: boolean;
  end_date: string;
  discount_amount: string;
}

export const discountsApi = createApi({
  reducerPath: 'discountsApi',
  tagTypes: ['discounts'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getDiscountByTourId: build.query<IDiscount, number>({
      query: (tourId) => `stocks/${tourId}/`,
      providesTags: (result, _error, id) => [{ type: 'discounts', id }],
    }),
  }),
});

export const { useGetDiscountByTourIdQuery } = discountsApi;
