import { configureStore } from '@reduxjs/toolkit';

import { hotelsApi } from '@/servicesApi/hotelsApi';

export const store = configureStore({
  reducer: {
    [hotelsApi.reducerPath]: hotelsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(hotelsApi.middleware),
});
