import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { RoomType } from '@/types/room';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  tagTypes: ['Rooms'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    // Получить список всех номеров
    getRooms: build.query<
      {
        count: number;
        next: string | null;
        previous: string | null;
        results: RoomType[];
      },
      { limit?: number; offset?: number }
    >({
      query: ({ limit, offset }) => {
        const params = new URLSearchParams();
        if (limit !== undefined) params.append('limit', String(limit));
        if (offset !== undefined) params.append('offset', String(offset));
        return `rooms/?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.results.map((room) => ({
                type: 'Rooms' as const,
                id: room.id,
              })),
              { type: 'Rooms', id: 'LIST' },
            ]
          : [{ type: 'Rooms', id: 'LIST' }],
    }),

    // Получить номера по ID отеля
    getRoomsByHotelId: build.query<RoomType[], number>({
      query: (hotelId) => `hotels/${hotelId}/rooms/`,
      transformResponse: (response: { results: RoomType[] }) => response.results,
      providesTags: (result) =>
        result
          ? [
              ...result.map((room) => ({ type: 'Rooms' as const, id: room.id })),
              { type: 'Rooms', id: 'LIST' },
            ]
          : [{ type: 'Rooms', id: 'LIST' }],
    }),

    // Получить один номер по ID
    getOneRoom: build.query<RoomType, { hotelId: number; roomId: number }>({
      query: ({ hotelId, roomId }) => `hotels/${hotelId}/rooms/${roomId}/`,
      providesTags: (result, error, { roomId }) => [{ type: 'Rooms', id: roomId }],
    }),

    // Добавить новый номер
    addRoom: build.mutation<RoomType, Omit<RoomType, 'id' | 'photo'>>({
      query: (body) => ({
        url: 'rooms/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'Rooms', id: 'LIST' }],
    }),

    // Обновить номер по ID
    updateRoom: build.mutation<
      RoomType,
      { id: number; body: Omit<RoomType, 'id' | 'photo'> }
    >({
      query: ({ id, body }) => ({
        url: `rooms/${id}/`,
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Rooms', id }],
    }),

    // Удалить номер по ID
    deleteRoom: build.mutation<null, number>({
      query: (id) => ({
        url: `rooms/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Rooms', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomsByHotelIdQuery,
  useGetOneRoomQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
