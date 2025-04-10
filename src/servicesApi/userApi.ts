import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getRoleFromStore, getUserIdFromStore } from '@/rtk/storeAccess';
import { clearUser } from '@/rtk/userSlice';
import { BASE_URL } from '@/temp/domen_nikita';
import { ITourist, ICompany } from '@/types/users';

import { getAccessToken } from './getAccessToken';

// Единый api-slice для пользователя-туриста и для пользователя-компании, чтобы уменьшить количество проверок в компонентах для оптимизации кода.
// В части эндпоинтов происходит проверка роли пользователя, чтобы подставить корректное значение в адрес запроса - users или companies. Таким образом, эндоинты универсальны и автоматически определяют, к какой группе запросов обращаться.
// Пример для понимания - getUserData. В зависимости от того, какой пользователь залогинился - запоминается его роль - "USER" или "TOUR_OPERATOR" | "HOTELIER", после чего во все используемые запросы подставляется корректный путь, ничего передавать не надо. Нужный id пользователя также подставляется автоматически.

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'Users'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getUserData: build.query<ITourist | ICompany, void>({
      query: () => {
        const role = getRoleFromStore();
        const id = getUserIdFromStore();
        const token = getAccessToken();
        // console.log(id, role)

        return {
          url: `${role}/${id}/`,
          method: 'GET',
          headers: {
            accept: 'application/json',
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Данные пользователя успешно получены!', data);
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
        }
      },
      providesTags: (result) => (result ? [{ type: 'User' }] : []),
    }),
    getAllUsersData: build.query<ITourist[] | ICompany[], void>({
      query: () => {
        const role = getRoleFromStore();
        const token = getAccessToken();

        return {
          url: `${role}/`,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Данные всех пользователей получены успешно!', data);
        } catch (error) {
          console.error('Ошибка при получении данных всех пользователей:', error);
        }
      },
      providesTags: (result) => (result ? [{ type: 'Users' }] : []),
    }),
    createNewTourist: build.mutation<{ email: string } | ITourist, FormData>({
      query: (formData) => {
        return {
          url: 'users/',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Новый турист зарегистрирован успешно!', data);
        } catch (error) {
          console.error('Ошибка при регистрации нового туриста:', error);
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    createNewCompany: build.mutation<ICompany, FormData>({
      query: (formData) => {
        return {
          url: 'companies/',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Новая компания зарегистрирована успешно!', data);
        } catch (error) {
          console.error('Ошибка при регистрации новой компании:', error);
        }
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    updateUser: build.mutation<ITourist | ICompany, FormData>({
      query: (formData) => {
        const role = getRoleFromStore();
        const id = getUserIdFromStore();
        const token = getAccessToken();

        return {
          url: `${role}/${id}/`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Пользователь обновлен успешно!', data);
        } catch (error) {
          console.error('Ошибка при обновлении пользователя:', error);
        }
      },
      invalidatesTags: () => [{ type: 'User', id: getUserIdFromStore() }],
    }),
    deleteUser: build.mutation<void, void>({
      query: () => {
        const role = getRoleFromStore();
        const id = getUserIdFromStore();
        const token = getAccessToken();

        return {
          url: `${role}/${id}/`,
          method: 'DELETE',
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Пользователь удален!', data);
          localStorage.clear();
          dispatch(clearUser());
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
      },
      invalidatesTags: () => [
        { type: 'User', id: getUserIdFromStore() },
        { type: 'Users' },
      ],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetAllUsersDataQuery,
  useCreateNewTouristMutation,
  useCreateNewCompanyMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
