/* eslint-disable no-commented-code/no-commented-code */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { IHotelsParamsQuery, IResponceListHotels } from '@/types/api-interfaces';
import { IHotel, IHotelMiniData } from '@/types/hotel';
import { PhotoHotel } from '@/types/photo_hotel';
import { MealType, RoomType } from '@/types/room';

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
  tagTypes: ['Hotels', 'PhotosHotel', 'RoomsHotel', 'PhotosRoom'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getHotels: build.query<IResponceListHotels, IHotelsParamsQuery>({
      query: (params) => {
        const queryParams = Object.entries(params ?? {})
          .filter(
            ([, value]) =>
              value !== undefined &&
              value !== null &&
              value !== '' &&
              !(typeof value === 'number' && isNaN(value)),
          )
          .flatMap(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map(
                (v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`,
              );
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
          });

        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

        return `hotels${queryString}`;
      },
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

    getOneHotel: build.query<IHotel, number | null>({
      query: (id) => `hotels/${id ?? ''}`,
      providesTags: [{ type: 'Hotels', id: 'LIST' }],
    }),
    addHotel: build.mutation<
      { id: number; name: string; city: string; country: string },
      { name: string; city: string; country: string }
    >({
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
      IHotel,
      {
        body: Omit<IHotel, 'rooms' | 'id' | 'reviews' | 'photo'>;
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
              ...result.map(({ id }) => ({ type: 'PhotosHotel' as const, id })),
              { type: 'PhotosHotel', id: 'LIST' },
            ]
          : [{ type: 'PhotosHotel', id: 'LIST' }],
    }),
    addPhotoHotel: build.mutation<PhotoHotel, { body: FormData; id: number }>({
      query: ({ body, id }) => ({
        url: `hotels/${id}/photos/`,
        method: 'POST',
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

    getRoomsHotel: build.query<{ results: RoomType[] }, number>({
      query: (id) => `hotels/${id}/rooms/`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'PhotosHotel' as const,
                id,
              })),
              { type: 'RoomsHotel', id: 'LIST' },
            ]
          : [{ type: 'RoomsHotel', id: 'LIST' }],
    }),
    addRoomHotel: build.mutation<
      PhotoHotel,
      { body: Omit<RoomType, 'id' | 'photo'>; id: number }
    >({
      query: ({ body, id }) => ({
        url: `hotels/${id}/rooms/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'RoomsHotel', id: 'LIST' }],
    }),
    changeRoomHotel: build.mutation<
      RoomType,
      {
        body: Omit<RoomType, 'id' | 'photo'>;
        hotel_id: number;
        room_id: number;
      }
    >({
      query: ({ body, hotel_id, room_id }) => ({
        url: `hotels/${hotel_id}/rooms/${room_id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'RoomsHotel', id: 'LIST' }],
    }),
    delRoomHotel: build.mutation<null, { hotelId: number; roomId: number }>({
      query: ({ hotelId, roomId }) => ({
        url: `hotels/${hotelId}/rooms/${roomId}/`,
        method: 'DELETE',
        headers: {
          accept: '*/*',
        },
      }),
      invalidatesTags: [{ type: 'RoomsHotel', id: 'LIST' }],
    }),

    getPhotosRoom: build.query<{ results: PhotoHotel[] }, number>({
      query: (id) => `hotels/rooms/${id}/photos/`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'PhotosRoom' as const,
                id,
              })),
              { type: 'PhotosRoom', id: 'LIST' },
            ]
          : [{ type: 'PhotosRoom', id: 'LIST' }],
    }),
    addPhotoRoom: build.mutation<PhotoHotel, { body: FormData; id: number }>({
      query: ({ body, id }) => ({
        url: `hotels/rooms/${id}/photos/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'PhotosRoom', id: 'LIST' }],
    }),
    delPhotoRoom: build.mutation<null, { room_id: number; photo_id: number }>({
      query: ({ room_id, photo_id }) => ({
        url: `hotels/rooms/${room_id}/photos/${photo_id}/`,
        method: 'DELETE',
        headers: {
          accept: '*/*',
        },
      }),
      invalidatesTags: [{ type: 'PhotosRoom', id: 'LIST' }],
    }),
    // /api/v1/hotels/{hotel_id}/rooms/
    getWhatAboutHotels: build.query<
      { name_set: string; hotel: IHotelMiniData[] }[],
      void
    >({
      query: () => `hotels/whats_about/`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log('HotOffer отели получены успешно!', data);
        } catch (error) {
          console.error('Ошибка при получении HotOffer отелей:', error);
        }
      },
    }),
    getHotelTypeOfMeals: build.query<MealType[], number>({
      query: (id) => `hotels/${id}/type_of_meals/`,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log('Типы питания отеля получены успешно!', data);
        } catch (error) {
          console.error('Ошибка при получении типов питания отеля:', error);
        }
      },
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
  useGetRoomsHotelQuery,
  useAddRoomHotelMutation,
  useChangeRoomHotelMutation,
  useDelRoomHotelMutation,
  useGetPhotosRoomQuery,
  useAddPhotoRoomMutation,
  useDelPhotoRoomMutation,
  useGetWhatAboutHotelsQuery,
  useGetHotelTypeOfMealsQuery,
} = hotelsApi;
