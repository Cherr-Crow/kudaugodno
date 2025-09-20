import { toast } from 'react-toastify';
import { Id } from 'react-toastify';

import { useIsMobile } from '@/shared/hooks/useIsMobile';

import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';
import { ToastType } from './ToastType.types';

interface ToastProps {
  type: ToastType;
  message: string;
  id?: Id;
}

export const iconColors: Record<ToastType, string> = {
  success: 'text-green-600',
  error: 'text-[#E94C4C]',
  info: 'text-blue-500',
  warning: 'text-yellow-primary',
};

export const Toast = ({ type, message, id }: ToastProps) => {
  const isMobile = useIsMobile();
  const isWarning = type === 'warning';

  const textColor = isWarning
    ? 'text-grey-950'
    : isMobile
      ? 'text-white'
      : 'text-grey-950';

  const iconColor = isMobile
    ? isWarning
      ? 'text-grey-950'
      : 'text-white'
    : iconColors[type];

  const containerWidth = isMobile ? 'w-[336px]' : 'w-[263px]';

  return (
    <div className={`${containerWidth} flex items-center justify-between`}>
      <div className={`flex items-center gap-1.5 ${iconColor}`}>
        <div>
          <SvgSprite
            name={isWarning ? `${type}-fill` : type}
            className='shrink-0'
            strokeWidth={1.5}
          />
        </div>
        <Typography className={textColor}>{message}</Typography>
      </div>

      {id && (
        <button
          onClick={() => toast.dismiss(id)}
          className={`shrink-0 ${textColor}`}
        >
          <SvgSprite name='cross' width={16} height={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};
