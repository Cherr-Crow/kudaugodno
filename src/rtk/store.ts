import { configureStore } from '@reduxjs/toolkit';

import { hotelsApi } from '@/sericesApi/hotelsApi';

export const store = configureStore({
  reducer: {
    [hotelsApi.reducerPath]: hotelsApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(hotelsApi.middleware),
});
