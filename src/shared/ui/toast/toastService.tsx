import { toast } from 'react-toastify';

import { futura } from '@/app/fonts/futura';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

import { Toast } from './Toast';
import { ToastType } from './ToastType.types';

export const toastColors: Record<ToastType, string> = {
  success: '!bg-green-600',
  error: '!bg-[#E94C4C]',
  info: '!bg-blue-500',
  warning: '!bg-yellow-primary',
};

export const toastProgressColors: Record<ToastType, string> = {
  success: '!bg-green-300',
  error: '!bg-[#f7b7b7]',
  info: '!bg-blue-200',
  warning: '!bg-[#fff0b5]',
};

export const useToast = () => {
  const isMobile = useIsMobile();

  const showToast = (message: string, type: ToastType = 'success') => {
    const bgColor = isMobile ? toastColors[type] : '!bg-grey-50';

    const id = toast(<Toast message={message} type={type} id={undefined} />, {
      className: `overflow-hidden !min-h-14 ${bgColor} md:!h-16 md:!max-w-[300px] md:!rounded-l-2xl md:!rounded-r-none md:mr-[-16px] ${futura.className}`,
      progressClassName: toastProgressColors[type],
    });

    toast.update(id, {
      render: <Toast message={message} type={type} id={id} />,
    });
  };

  return { showToast };
};
