import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import windowWidthReducer from './slices/windowWidthSlice';

export const store = configureStore({
  reducer: {
    testVal: testReducer,
    windowWidth: windowWidthReducer,
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
