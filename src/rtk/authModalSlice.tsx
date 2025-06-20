import { createSlice } from '@reduxjs/toolkit';

interface AuthModalState {
  isOpen: boolean;
}

const initialState: AuthModalState = {
  isOpen: false,
};

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isOpen = true;
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
  },
  selectors: {
    selectAuthModalStatus: (authModal) => authModal.isOpen,
  },
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export const { selectAuthModalStatus } = authModalSlice.selectors;
export default authModalSlice.reducer;
