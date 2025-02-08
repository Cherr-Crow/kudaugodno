'use client';

import { useRouter } from 'next/navigation';

import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className='container grid items-center gap-2 pb-10 pt-6 md:grid-cols-[0.5fr_1fr]'>
      <div className='md:order-1'>
        <Typography
          children='Уппсс... Не волнуйтесь!'
          variant='h4'
          className='text-center text-blue-900'
        />
        {error && (
          <Typography className='my-5 block text-center text-blue-900 text-red-primary-800 md:text-xl'>
            {error.message}
          </Typography>
        )}
        <div className='flex gap-3'>
          <ButtonCustom
            variant='primary'
            size='s'
            onClick={router.back}
            className='w-full'
          >
            <Typography children='Вернуться' variant='m-bold' />
          </ButtonCustom>
          <ButtonCustom
            variant='primary'
            size='s'
            onClick={() => router.push('/')}
            className='w-full'
          >
            <Typography children='На главную' variant='m-bold' />
          </ButtonCustom>
        </div>
      </div>
      <div className='flex h-full w-full items-center py-5 md:order-2 md:py-0 lg:items-end'>
        <img src={'/mob_picture_404.png'} alt='' className='w-full' rel='prefetch' />
      </div>
    </div>
  );
}
