import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { clearUser, setUser } from '@/rtk/userSlice';
import { BASE_URL } from '@/temp/domen_nikita';

import { getAccessToken } from './getAccessToken';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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

          localStorage.setItem('access', JSON.stringify(data.access));
          localStorage.setItem('refresh', JSON.stringify(data.refresh));

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
        const refreshToken = localStorage.getItem('refresh');
        let parsedRefresh;

        if (refreshToken) {
          parsedRefresh = JSON.parse(refreshToken);
        } else {
          throw new Error('Refresh token is missing');
        }

        return {
          url: 'auth/logout/',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: { refresh: parsedRefresh },
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
