import { configureStore } from '@reduxjs/toolkit';

import { applicationsApi } from '@/servicesApi/applicationsApi';
import { authApi } from '@/servicesApi/authApi';
import { flightsApi } from '@/servicesApi/flightsApi';
import { hotelsApi } from '@/servicesApi/hotelsApi';
import { toursApi } from '@/servicesApi/toursApi';
import { userApi } from '@/servicesApi/userApi';

import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
    [toursApi.reducerPath]: toursApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(
      userApi.middleware,
      authApi.middleware,
      hotelsApi.middleware,
      flightsApi.middleware,
      toursApi.middleware,
      applicationsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
