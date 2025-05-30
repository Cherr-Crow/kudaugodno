import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import {
  IApplication,
  IApplicationHotel,
  IApplicationTour,
  IApplicationRequest,
} from '@/types/application';

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  tagTypes: ['applications'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getTourApplications: build.query<
      IApplicationTour[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `applications/tours/?${limit && 'limit=' + limit}${offset && '&offset=' + offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ phone_number }: { phone_number: string }) => ({
                type: 'applications' as const,
                phone_number,
              })),
              { type: 'applications', id: 'LIST' },
            ]
          : [{ type: 'applications', id: 'LIST' }],
    }),
    getHotelApplications: build.query<
      IApplicationHotel[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `applications/hotels/?${limit && 'limit=' + limit}${offset && '&offset=' + offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ phone_number }: { phone_number: string }) => ({
                type: 'applications' as const,
                phone_number,
              })),
              { type: 'applications', id: 'LIST' },
            ]
          : [{ type: 'applications', id: 'LIST' }],
    }),
    getApplications: build.query<
      IApplication[],
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `applications/?${limit && 'limit=' + limit}${offset && '&offset=' + offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ phone_number }: { phone_number: string }) => ({
                type: 'applications' as const,
                phone_number,
              })),
              { type: 'applications', id: 'LIST' },
            ]
          : [{ type: 'applications', id: 'LIST' }],
    }),
    addApplication: build.mutation<IApplication, IApplicationRequest>({
      query: (body) => ({
        url: 'applications/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'applications', id: 'LIST' }],
    }),
    getOneApplication: build.query<IApplication, number | void>({
      query: (id) => `flights/${id ?? ''}`,
      providesTags: [{ type: 'applications', id: 'LIST' }],
    }),
    changeApplication: build.mutation<
      IApplication,
      {
        body: Omit<IApplication, 'id'>;
        id: number;
      }
    >({
      query: ({ body, id }) => ({
        url: `applications/${id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'applications', id: 'LIST' }],
    }),
    deleteApplication: build.mutation({
      query: (id: number) => ({
        url: `applications/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'applications', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTourApplicationsQuery,
  useGetApplicationsQuery,
  useAddApplicationMutation,
  useGetOneApplicationQuery,
  useLazyGetOneApplicationQuery,
  useChangeApplicationMutation,
  useDeleteApplicationMutation,
} = applicationsApi;
