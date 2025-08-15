import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface PrefillEmailState {
  email?: string;
}

const initialState: PrefillEmailState = {};

export const prefillEmailSlice = createSlice({
  name: 'prefillEmail',
  initialState,
  reducers: {
    setPrefillEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    clearPrefillEmail(state) {
      state.email = undefined;
    },
  },
  selectors: {
    selectPrefillEmail: (prefillEmail) => prefillEmail.email,
  },
});

export const { setPrefillEmail, clearPrefillEmail } = prefillEmailSlice.actions;
export const { selectPrefillEmail } = prefillEmailSlice.selectors;
