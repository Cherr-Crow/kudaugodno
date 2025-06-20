import { configureStore } from '@reduxjs/toolkit';

import { applicationsApi } from '@/servicesApi/applicationsApi';
import { authApi } from '@/servicesApi/authApi';
import { discountsApi } from '@/servicesApi/discountApi';
import { flightsApi } from '@/servicesApi/flightsApi';
import { hotelsApi } from '@/servicesApi/hotelsApi';
import { insurancesApi } from '@/servicesApi/insurancesApi';
import { roomsApi } from '@/servicesApi/roomsApi';
import { subscribeApi } from '@/servicesApi/subscribeApi';
import { toursApi } from '@/servicesApi/toursApi';
import { userApi } from '@/servicesApi/userApi';
import { wzhuhApi } from '@/servicesApi/wzhuhApi';

import { authModalSlice } from './authModalSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    [wzhuhApi.reducerPath]: wzhuhApi.reducer,
    [discountsApi.reducerPath]: discountsApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [authModalSlice.reducerPath]: authModalSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
    [toursApi.reducerPath]: toursApi.reducer,
    [insurancesApi.reducerPath]: insurancesApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(
      wzhuhApi.middleware,
      discountsApi.middleware,
      subscribeApi.middleware,
      userApi.middleware,
      authApi.middleware,
      hotelsApi.middleware,
      flightsApi.middleware,
      toursApi.middleware,
      insurancesApi.middleware,
      applicationsApi.middleware,
      roomsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
