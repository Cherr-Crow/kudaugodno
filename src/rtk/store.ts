import { configureStore } from '@reduxjs/toolkit';

import { flightsApi } from '@/servicesApi/flightsApi';
import { hotelsApi } from '@/servicesApi/hotelsApi';
import { toursApi } from '@/servicesApi/toursApi';

export const store = configureStore({
  reducer: {
    [hotelsApi.reducerPath]: hotelsApi.reducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
    [toursApi.reducerPath]: toursApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(
      hotelsApi.middleware,
      flightsApi.middleware,
      toursApi.middleware,
    ),
});
