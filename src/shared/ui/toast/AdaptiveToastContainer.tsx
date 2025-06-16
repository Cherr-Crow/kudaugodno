'use client';

import { ToastContainer } from 'react-toastify';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import 'react-toastify/dist/ReactToastify.css';

export const AdaptiveToastContainer = () => {
  const isMobile = useIsMobile();

  return (
    <ToastContainer
      position={isMobile ? 'bottom-center' : 'bottom-right'}
      autoClose={5000}
      pauseOnHover
      closeOnClick
      closeButton={false}
      hideProgressBar={false}
      theme='colored'
    />
  );
};
