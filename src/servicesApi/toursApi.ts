import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IFlight } from '@/types/flight-type';
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
    addTour: build.mutation<IFlight, Omit<IFlight, 'id'>>({
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
    getOneTour: build.query<IFlight, number | void>({
      query: (id) => `tours/${id ?? ''}`,
      providesTags: [{ type: 'Tours', id: 'LIST' }],
    }),
    changeTour: build.mutation<
      IFlight,
      {
        body: Omit<IFlight, 'id'>;
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
  useAddTourMutation,
  useGetOneTourQuery,
  useChangeTourMutation,
  useDeleteTourMutation,
} = toursApi;
