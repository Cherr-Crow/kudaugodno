import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Hotel } from '@/types/hotel';

const BASE_URL =
  process.env.NEXT_PUBLIC_KUDA_UGODNO__FRONTEND__MAIN_APP__FULL_DOMAIN__DEV;

interface IResponceListHotels {
  count: number;
  next: null;
  previous: null;
  results: Hotel[];
}

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
  tagTypes: ['Hotels'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getHotels: build.query<IResponceListHotels, number | void>({
      query: (limit = 15, offset = 1) => `hotels?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'Hotels' as const,
                id,
              })),
              { type: 'Hotels', id: 'LIST' },
            ]
          : [{ type: 'Hotels', id: 'LIST' }],
    }),
    getOneHotel: build.query<Hotel, number | null>({
      query: (id) => `hotels/${id ?? ''}`,
      providesTags: [{ type: 'Hotels', id: 'LIST' }],
    }),
    addHotel: build.mutation<{ id: number; name: string }, { name: string }>({
      query: (body) => ({
        url: 'hotels/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Hotels', id: 'LIST' }],
    }),
    changeHotel: build.mutation<
      Hotel,
      {
        body: Omit<Hotel, 'rooms' | 'dates' | 'id' | 'reviews' | 'photos'>;
        id: number;
      }
    >({
      query: ({ body, id }) => ({
        url: `hotels/${id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Hotels', id: 'LIST' }],
    }),
    deleteHotel: build.mutation({
      query: (id: number) => ({
        url: `hotels/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Hotels', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetOneHotelQuery,
  useAddHotelMutation,
  useChangeHotelMutation,
  useDeleteHotelMutation,
} = hotelsApi;
