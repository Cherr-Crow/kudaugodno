import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';
import { ICompany, ITourist } from '@/types/users';

interface IFetchMeResponse {
  message: string;
  user: ITourist | ICompany;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['auth', 'User'],
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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log('Верификация прошла успешно!', response);
        } catch (error) {
          console.error('Ошибка при верификации кода:', error);
        }
      },
    }),
    fetchMe: build.query<IFetchMeResponse, void>({
      query: () => {
        return {
          url: 'auth/fetch_me/',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          console.log('Текущий пользователь получен успешно!', res);
        } catch (error) {
          console.error('Ошибка при получении текущего пользователя', error);
        }
      },
      providesTags: (result) =>
        result ? [{ type: 'User', id: 'me' }] : [{ type: 'User' }],
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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('Логаут прошел успешно!');
        } catch (error) {
          console.error('Ошибка при логауте:', error);
        }
      },
    }),
  }),
});

export const {
  useGetCodeMutation,
  useConfirmCodeMutation,
  useFetchMeQuery,
  useLogoutMutation,
} = authApi;
