import { store } from '@/rtk/store';
import { RootState } from '@/rtk/store';

export const getRoleFromStore = (): string => {
  const role = (store.getState() as RootState).currentUser.role;
  let result;
  if (role === 'USER') {
    result = 'users';
  } else if (role === 'TOUR_OPERATOR' || role === 'HOTELIER') {
    result = 'companies';
  } else {
    result = 'norole';
  }
  return result;
};

export const getUserIdFromStore = (): number => {
  return (store.getState() as RootState).currentUser.id;
};
