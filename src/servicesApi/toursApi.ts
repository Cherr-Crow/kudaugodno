import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { ITour } from '@/types/tour-type';

export const toursApi = createApi({
  reducerPath: 'toursApi',
  tagTypes: ['Tours'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getTours: build.query<ITour[], { limit?: number; offset?: number }>({
      query: ({ limit, offset }) =>
        `tours/?${limit && 'limit=' + limit}${offset && '&offset=' + offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: 'Tours' as const,
                id,
              })),
              { type: 'Tours', id: 'LIST' },
            ]
          : [{ type: 'Tours', id: 'LIST' }],
    }),
    getToursByHotel: build.query<
      ITour[],
      { hotelId: number; limit?: number; offset?: number }
    >({
      query: ({ hotelId, limit, offset }) => {
        const params = new URLSearchParams();
        params.set('hotel_id', hotelId.toString());
        if (limit) params.set('limit', limit.toString());
        if (offset) params.set('offset', offset.toString());
        return `tours/?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tours' as const, id })),
              { type: 'Tours', id: 'LIST' },
            ]
          : [{ type: 'Tours', id: 'LIST' }],
    }),
    getToursByHotels: build.query<
      ITour[],
      { hotelIds: number[]; limit?: number; offset?: number }
    >({
      query: ({ hotelIds, limit, offset }) => {
        const params = new URLSearchParams();
        params.set('hotel_ids', hotelIds.join(','));
        if (limit) params.set('limit', limit.toString());
        if (offset) params.set('offset', offset.toString());
        return `tours/?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tours' as const, id })),
              { type: 'Tours', id: 'LIST' },
            ]
          : [{ type: 'Tours', id: 'LIST' }],
    }),
    addTour: build.mutation<ITour, Omit<ITour, 'id'>>({
      query: (body) => ({
        url: 'tours/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
    getOneTour: build.query<ITour, number | void>({
      query: (id) => `tours/${id ?? ''}`,
      providesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
    changeTour: build.mutation<
      ITour,
      {
        body: Omit<ITour, 'id'>;
        id: number;
      }
    >({
      query: ({ body, id }) => ({
        url: `tours/${id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
    patchTour: build.mutation<
      ITour,
      { id: number; body: Partial<Omit<ITour, 'id'>> }
    >({
      query: ({ id, body }) => ({
        url: `tours/${id}/`,
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
    deleteTour: build.mutation({
      query: (id: number) => ({
        url: `tours/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetToursByHotelQuery,
  useGetToursByHotelsQuery,
  useAddTourMutation,
  useGetOneTourQuery,
  useChangeTourMutation,
  useDeleteTourMutation,
  usePatchTourMutation,
} = toursApi;
