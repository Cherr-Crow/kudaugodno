import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IFlight } from '@/types/flight';

interface IResponseListFlights {
  count: number;
  next: null;
  previous: null;
  results: IFlight[];
}

export const flightsApi = createApi({
  reducerPath: 'flightsApi',
  tagTypes: ['Flights'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getFlights: build.query<
      IResponseListFlights,
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `flights/?${limit && 'limit=' + limit}${offset && '&offset=' + offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(
                ({ flight_number }: { flight_number: string }) => ({
                  type: 'Flights' as const,
                  flight_number,
                }),
              ),
              { type: 'Flights', id: 'LIST' },
            ]
          : [{ type: 'Flights', id: 'LIST' }],
    }),
    addFlight: build.mutation<IFlight, Omit<IFlight, 'id'>>({
      query: (body) => ({
        url: 'flights/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Flights', id: 'LIST' }],
    }),
    getOneFlight: build.query<IFlight, number | null>({
      query: (id) => `flights/${id ?? ''}`,
      providesTags: [{ type: 'Flights', id: 'LIST' }],
    }),
    changeFlight: build.mutation<
      IFlight,
      {
        body: Omit<IFlight, 'id'>;
        id: number;
      }
    >({
      query: ({ body, id }) => ({
        url: `flights/${id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Flights', id: 'LIST' }],
    }),
    deleteFlight: build.mutation({
      query: (id: number) => ({
        url: `flights/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Flights', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useAddFlightMutation,
  useGetOneFlightQuery,
  useLazyGetOneFlightQuery,
  useChangeFlightMutation,
  useDeleteFlightMutation,
} = flightsApi;
