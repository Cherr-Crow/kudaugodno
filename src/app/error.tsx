'use client';

import Link from 'next/link';

import { Typography } from '@/shared/typography';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='container grid items-center gap-2 px-4 pb-10 pt-6 md:grid-cols-[0.5fr_1fr]'>
      <div className='md:order-1'>
        <Typography
          children='Уппсс... Не волнуйтесь!'
          variant='h4'
          className='text-center text-blue-900'
        />
        <Typography
          children={`${error}`}
          className='my-5 block text-blue-900 md:text-xl'
        />
        <Link
          href='/'
          className='flex w-full items-center justify-center rounded-full bg-green-300 py-3'
        >
          <Typography children='На главную' variant='m-bold' />
        </Link>
      </div>
      <div className='flex h-full w-full items-center py-5 md:order-2 md:py-0 lg:items-end'>
        <img src={'/mob_picture_404.png'} alt='' className='w-full' rel='prefetch' />
      </div>
    </div>
  );
}
