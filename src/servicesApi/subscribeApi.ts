import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/temp/domen_nikita';

interface ISubscribeRequest {
  email: string;
  mailing: boolean;
}

interface ISubscribeResponse {
  id: number;
  email: string;
  mailing: boolean;
}

export const subscribeApi = createApi({
  reducerPath: 'mailingApi',
  tagTypes: ['mailing'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    sendMailing: build.mutation<ISubscribeResponse, ISubscribeRequest>({
      query: (body) => ({
        url: '/mailings/',
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: [{ type: 'mailing', id: 'LIST' }],
    }),
  }),
});

export const { useSendMailingMutation } = subscribeApi;
