import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import  tabBarReducer  from './slices/tabBarSearcForm';


export const store = configureStore({
  reducer: {
    testVal: testReducer,
    tabBarSearchForm: tabBarReducer,  
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
