import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createSelector } from '@reduxjs/toolkit';

import { ITourist, ICompany } from '@/types/users';

type UserRole = 'USER' | 'TOUR_OPERATOR' | 'HOTELIER' | '';

type CurrentUserState = {
  role: UserRole;
  data: ITourist | ICompany | null;
};

const initialState: CurrentUserState = {
  role: '',
  data: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<ITourist | ICompany>) {
      const isCompany = 'company_name' in action.payload;

      state.role = isCompany
        ? action.payload.role || 'TOUR_OPERATOR'
        : action.payload.role || 'USER';

      state.data = action.payload;
    },
    clearCurrentUser() {
      return initialState;
    },
  },
  selectors: {
    selectUserRole: (currentUser) => currentUser.role,
    selectUserId: (currentUser) => (currentUser.data ? currentUser.data.id : null),
    selectEmail: (currentUser) => (currentUser.data ? currentUser.data.email : null),
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export const { selectUserRole, selectUserId, selectEmail } =
  currentUserSlice.selectors;

export const selectUserPersonalData = createSelector(
  (state: { currentUser: CurrentUserState }) => state.currentUser.data,
  (state: { currentUser: CurrentUserState }) => state.currentUser.role,
  (data, role) => {
    if (!data) return null;

    if (role === 'USER') {
      const touristData = data as ITourist;
      return {
        // Все что нужно для отображения в ЛК Туриста + обязательные поля для отправки запроса на изменение пользователя
        id: touristData.id,
        first_name: touristData.first_name,
        last_name: touristData.last_name,
        email: touristData.email,
        phone_number: touristData.phone_number,
        birth_date: touristData.birth_date,
        avatar: touristData.avatar,
      };
    }

    if (role === 'TOUR_OPERATOR' || role === 'HOTELIER') {
      const companyData = data as ICompany;
      return {
        // Все что нужно для отображения в ЛК Туроператора + обязательные поля для отправки запроса на изменение пользователя
        id: companyData.id,
        first_name: companyData.first_name,
        last_name: companyData.last_name,
        email: companyData.email,
        phone_number: companyData.phone_number,
        birth_date: companyData.birth_date,
        avatar: companyData.avatar,
        company_name: companyData.company_name,
      };
    }

    return null;
  },
);

export const selectUserDataWithSettings = createSelector(
  (state: { currentUser: CurrentUserState }) => state.currentUser.data,
  (state: { currentUser: CurrentUserState }) => state.currentUser.role,
  (data, role) => {
    if (!data) return null;

    if (role === 'USER') {
      const touristData = data as ITourist;
      return {
        // Обязательные поля для запроса на изменение пользователя + настройки для отображения
        id: touristData.id,
        first_name: touristData.first_name,
        last_name: touristData.last_name,
        email: touristData.email,
        phone_number: touristData.phone_number,
        language: touristData.language,
        currency: touristData.currency,
        notifications_enabled: touristData.notifications_enabled,
        preferred_contact_channel: touristData.preferred_contact_channel,
      };
    }
    return null;
  },
);
