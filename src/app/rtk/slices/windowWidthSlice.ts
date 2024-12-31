import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type WindowWidthState = {
  value: number;
};

const initialState: WindowWidthState = {
  value: 0, 
};

export const windowWidthSlice = createSlice({
  name: 'windowWidth',
  initialState,
  reducers: {
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setWindowWidth } = windowWidthSlice.actions;


export const selectWindowWidth = (state: RootState) => state.windowWidth.value;

export default windowWidthSlice.reducer;
