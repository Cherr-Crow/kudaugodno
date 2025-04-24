import { store } from '@/rtk/store';
import { RootState } from '@/rtk/store';

export const getRoleFromStore = (): string => {
  const role = (store.getState() as RootState).currentUser.role;

  switch (role) {
    case 'USER':
      return 'users';
    case 'TOUR_OPERATOR':
    case 'HOTELIER':
      return 'companies';
    default:
      return 'norole';
  }
};

export const getUserIdFromStore = (): number => {
  return (store.getState() as RootState).currentUser.id;
};
