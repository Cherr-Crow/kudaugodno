import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';

export interface IPopularTour {
  arrival_country: string;
  photo: string;
  total_price: string;
  tours_count: number;
}

export const popularToursApi = createApi({
  reducerPath: 'popularToursApi',
  tagTypes: ['popularTours'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPopularTours: build.query<IPopularTour[], { limit: number; offset?: number }>(
      {
        query: ({ limit, offset = 0 }) =>
          `tours/populars/?limit=${limit}&offset=${offset}`,
        providesTags: ['popularTours'],
      },
    ),
  }),
});

export const { useGetPopularToursQuery } = popularToursApi;
