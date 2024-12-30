import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TabBarChangeState = {
  value: string;
};

const initialState: TabBarChangeState = {
  value: 'Туры', 
};

export const tabBarSearchFormSlice = createSlice({
  name: 'tabBarSearchForm',
  initialState,
  reducers: {
    setTabBar: (state,  action: PayloadAction<string>) => {
      state.value = action.payload;;
    },
  }
 }
);

export const { setTabBar } = tabBarSearchFormSlice.actions;


export const selectTabBarSearchForm = (state: RootState) => state.tabBarSearchForm.value;

export default tabBarSearchFormSlice.reducer;
