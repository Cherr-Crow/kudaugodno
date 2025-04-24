import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CurrentUserState {
  id: number;
  role: string;
  email?: string;
}

const initialState: CurrentUserState = {
  id: 0,
  role: 'norole',
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CurrentUserState>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    clearUser(state) {
      state.id = 0;
      state.role = '';
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    clearUserEmail(state) {
      delete state.email;
    },
  },
  selectors: {
    selectUserRole: (currentUser) => currentUser.role,
    selectUserId: (currentUser) => currentUser.id,
    selectEmail: (currentUser) => currentUser.email,
  },
});

export const { setUser, clearUser, setUserEmail, clearUserEmail } =
  userSlice.actions;
export const { selectUserRole, selectUserId, selectEmail } = userSlice.selectors;
