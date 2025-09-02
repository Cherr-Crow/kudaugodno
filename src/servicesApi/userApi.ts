import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getApiPathByRole } from '@/shared/utils/getApiPathByRole';
import { BASE_URL } from '@/temp/domen_nikita';
import { ITourist, ICompany } from '@/types/users';

// Единый api-slice для пользователя-туриста и для пользователя-компании, чтобы уменьшить количество проверок в компонентах для оптимизации кода.

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getUserData: build.query<
      ITourist | ICompany,
      { role: 'USER' | 'TOUR_OPERATOR' | 'HOTELIER'; id: number }
    >({
      query: ({ role, id }) => {
        const rolePath = getApiPathByRole(role);

        return {
          url: `${rolePath}/${id}/`,
          method: 'GET',
          headers: {
            accept: 'application/json',
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
      providesTags: (result) => (result ? [{ type: 'User', id: 'me' }] : []),
    }),
    getAllUsersData: build.query<
      ITourist[] | ICompany[],
      { role: 'USER' | 'TOUR_OPERATOR' | 'HOTELIER' }
    >({
      query: ({ role }) => {
        const rolePath = getApiPathByRole(role);

        return {
          url: `${rolePath}/`,
          headers: {
            accept: 'application/json',
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
          credentials: 'omit',
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
          credentials: 'omit',
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
    updateUser: build.mutation<
      ITourist | ICompany,
      { role: 'USER' | 'TOUR_OPERATOR' | 'HOTELIER'; id: number; formData: FormData }
    >({
      query: ({ role, id, formData }) => {
        const rolePath = getApiPathByRole(role);

        return {
          url: `${rolePath}/${id}/`,
          method: 'PUT',
          headers: {
            accept: 'application/json',
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
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    deleteUser: build.mutation<
      void,
      { role: 'USER' | 'TOUR_OPERATOR' | 'HOTELIER'; id: number }
    >({
      query: ({ role, id }) => {
        const rolePath = getApiPathByRole(role);

        return {
          url: `${rolePath}/${id}/`,
          method: 'DELETE',
          headers: {
            accept: '*/*',
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Пользователь удален!', data);
        } catch (error) {
          console.error('Ошибка при удалении пользователя:', error);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
        { type: 'Users' },
      ],
    }),
    deactivateUser: build.mutation<void, number>({
      query: (id) => {
        return {
          url: `users/${id}/deactivate/`,
          method: 'POST',
          headers: {
            accept: 'application/json',
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Пользователь деактивирован!', data);
        } catch (error) {
          console.error('Ошибка при деактивации пользователя:', error);
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
  useGetAllUsersDataQuery,
  useCreateNewTouristMutation,
  useCreateNewCompanyMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeactivateUserMutation,
} = userApi;
