import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { clearUser, setUser } from '@/rtk/userSlice';
import { BASE_URL } from '@/temp/domen_nikita';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getCode: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: 'auth/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
        credentials: 'omit',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Код отправлен на почту!');
        } catch (error) {
          console.error('Ошибка при отправке кода:', error);
        }
      },
    }),
    confirmCode: build.mutation<string, { email: string; code: string }>({
      query: (body) => ({
        url: 'auth/verify/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log('Верификация прошла успешно!', response);
          const data =
            typeof response.data === 'string'
              ? JSON.parse(response.data)
              : response.data;

          localStorage.setItem('id', JSON.stringify(data.id));
          localStorage.setItem('role', data.role);

          dispatch(setUser({ id: data.id, role: data.role }));
        } catch (error) {
          console.error('Ошибка при верификации кода:', error);
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        return {
          url: 'auth/logout/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Логаут прошел успешно!');
          localStorage.clear();
          dispatch(clearUser());
        } catch (error) {
          console.error('Ошибка при логауте:', error);
        }
      },
    }),
  }),
});

export const { useGetCodeMutation, useConfirmCodeMutation, useLogoutMutation } =
  authApi;
