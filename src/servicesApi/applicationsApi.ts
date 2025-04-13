import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IApplication } from '@/types/application';

interface IResponseListApplications {
  count: number;
  next: null;
  previous: null;
  results: IApplication[];
}

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  tagTypes: ['Applications'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getApplications: build.query<
      IResponseListApplications,
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) =>
        `applications?${limit ? 'limit=' + limit : ''}${offset ? '&offset=' + offset : ''}`,
      providesTags: (result) => {
        if (!result || !Array.isArray(result.results)) {
          return [];
        }
        return [
          { type: 'Applications', id: 'LIST' },
          ...result.results.map((application) => ({
            type: 'Applications' as const,
            id: application.id,
          })),
        ];
      },
    }),

    getOneApplication: build.query<IApplication, number | null>({
      query: (id) => `applications/${id ?? ''}`,
      providesTags: [{ type: 'Applications', id: 'LIST' }],
    }),

    addApplication: build.mutation<IApplication, { body: Omit<IApplication, 'id'> }>(
      {
        query: (body) => ({
          url: 'applications/',
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body,
        }),
        invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
      },
    ),

    changeApplication: build.mutation<
      IApplication,
      { body: Omit<IApplication, 'id'>; id: number }
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
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),

    deleteApplication: build.mutation({
      query: (id: number) => ({
        url: `applications/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetOneApplicationQuery,
  useAddApplicationMutation,
  useChangeApplicationMutation,
  useDeleteApplicationMutation,
} = applicationsApi;
