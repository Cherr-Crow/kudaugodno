import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';

export interface IPopularTour {
  arrival_country: string;
  photo: string;
  price: number;
  tours_count: number;
}

export const popularToursApi = createApi({
  reducerPath: 'popularToursApi',
  tagTypes: ['popularTours'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPopularTours: build.query<IPopularTour[], void>({
      query: () => 'tours/populars/',
      providesTags: ['popularTours'],
    }),
  }),
});

export const { useGetPopularToursQuery } = popularToursApi;
