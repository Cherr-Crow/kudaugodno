import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import hotelCreateReducer from './slices/hotelCreate';

export const store = configureStore({
  reducer: {
    hotelCreate: hotelCreateReducer,
    testVal: testReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
