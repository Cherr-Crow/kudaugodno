import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { Hotel } from '@/types/hotel';
import { PhotoHotel } from '@/types/photo_hotel';

interface IResponceListHotels {
  count: number;
  next: null;
  previous: null;
  results: Hotel[];
}

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
  tagTypes: ['Hotels', 'PhotosHotel'],
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

    getPhotosHotel: build.query<PhotoHotel[], number>({
      query: (id) => `hotels/${id}/photos/`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: 'PhotosHotel' as const,
                id,
              })),
              { type: 'PhotosHotel', id: 'LIST' },
            ]
          : [{ type: 'PhotosHotel', id: 'LIST' }],
    }),
    addPhotoHotel: build.mutation<PhotoHotel, { body: FormData; id: number }>({
      query: ({ body, id }) => ({
        url: `hotels/${id}/photos/`,
        method: 'POST',
        // headers: {
        //   accept: 'application/json',
        //   'Content-Type': 'multipart/form-data',
        // },
        body,
      }),
      invalidatesTags: [{ type: 'PhotosHotel', id: 'LIST' }],
    }),
    delPhotoHotel: build.mutation<null, { hotel_id: number; photo_id: number }>({
      query: ({ hotel_id, photo_id }) => ({
        url: `hotels/${hotel_id}/photos/${photo_id}/`,
        method: 'DELETE',
        headers: {
          accept: '*/*',
        },
      }),
      invalidatesTags: [{ type: 'PhotosHotel', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetOneHotelQuery,
  useAddHotelMutation,
  useChangeHotelMutation,
  useDeleteHotelMutation,
  useGetPhotosHotelQuery,
  useAddPhotoHotelMutation,
  useDelPhotoHotelMutation,
} = hotelsApi;
