import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';

export interface IPopularTour {
  arrival_country: string;
  photo: string;
  total_price: string;
  tours_count: number;
}

export interface IPopularToursResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPopularTour[];
}

export const popularToursApi = createApi({
  reducerPath: 'popularToursApi',
  tagTypes: ['popularTours'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getPopularTours: build.query<
      IPopularTour[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset } = {}) => ({
        url: 'tours/populars/',
        params: { limit, offset },
      }),
      providesTags: ['popularTours'],
      transformResponse: (response: IPopularToursResponse): IPopularTour[] =>
        response.results,
    }),
  }),
});

export const { useGetPopularToursQuery } = popularToursApi;
