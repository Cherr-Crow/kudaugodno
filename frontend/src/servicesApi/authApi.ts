import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCurrentUser, clearCurrentUser } from '@/rtk/currentUserSlice';
import { BASE_URL } from '@/temp/domen_nikita';
import { ICompany, ITourist } from '@/types/users';
interface IFetchMeResponse {
  message: string;
  user: ITourist | ICompany;
}

interface IFetchMeError {
  error: {
    data: {
      detail: string;
    };
    status: number;
  };
}

function isFetchMeError(error: unknown): error is IFetchMeError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof error.error === 'object' &&
    error.error !== null &&
    'status' in error.error &&
    typeof error.error.status === 'number' &&
    'data' in error.error &&
    typeof error.error.data === 'object' &&
    error.error.data !== null &&
    'detail' in error.error.data &&
    typeof error.error.data.detail === 'string'
  );
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          console.log('Текущий пользователь получен успешно!', res);
          if (res.data?.user) {
            dispatch(setCurrentUser(res.data.user));
          }
        } catch (error) {
          if (isFetchMeError(error)) {
            const detail = error.error.data.detail;
            if (detail.includes('Учетные данные не были предоставлены.')) {
              console.log('Авторизованный пользователь отсутствует:', error);
              return;
            }
          }
          console.error('Ошибка при получении текущего пользователя: ', error);
          dispatch(clearCurrentUser());
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
  useLazyFetchMeQuery,
  useLogoutMutation,
} = authApi;
