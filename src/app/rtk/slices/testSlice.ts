import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TestState = {
  value: string;
};

const initialState: TestState = {
  value: 'начальное значение стейта',
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { test } = testSlice.actions;

export const selectTest = (state: RootState) => state.testVal.value;

export default testSlice.reducer;

