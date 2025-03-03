import Link from 'next/link';

import { Typography } from '@/shared/typography';

export default function NotFound() {
  return (
    <div className='container grid items-center gap-2 px-4 pb-10 pt-6 md:grid-cols-[0.5fr_1fr]'>
      <div className='md:order-1'>
        <p className='text-center text-[128px] font-medium text-blue-900 md:text-[200px] xl:text-[280px]'>
          404
        </p>
        <Typography variant='h4' className='text-center text-blue-900'>
          Уппсс... Не волнуйтесь!
        </Typography>
        <Typography className='my-5 block text-blue-900 md:text-xl'>
          Извините, но страница, которую вы ищете, не найдена, возможно, вы ввели
          неправильный URL-адрес, или страница была перемещена, удалена или временно
          недоступна
        </Typography>
        <Link
          href='/'
          className='flex w-full items-center justify-center rounded-full bg-green-300 py-3'
        >
          <Typography variant='m-bold'>На главную</Typography>
        </Link>
      </div>
      <div className='flex h-full w-full items-center py-5 md:order-2 md:py-0 lg:items-end'>
        <img src={'/mob_picture_404.png'} alt='' className='w-full' rel='prefetch' />
      </div>
    </div>
  );
}
