'use client';

import { useEffect } from 'react';

import { Provider } from 'react-redux';

import { store } from './store';
import { setUser } from './userSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const idFromStorage = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    if (!idFromStorage || !role) return;

    const id = Number(idFromStorage);

    if (isNaN(id)) return;

    store.dispatch(setUser({ id, role }));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
