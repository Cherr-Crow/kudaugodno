import Link from 'next/link';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { MyArticles } from '@/widgets/admin-panel-tourist/reviews/MyArticles';

type WzhuhResultArticlesProps = {
  description_blog: string;
};

export function WzhuhResultArticles({ description_blog }: WzhuhResultArticlesProps) {
  return (
    <div className='mb-5 overflow-hidden rounded-[20px] bg-blue-50 pt-5 md:mb-10 md:pt-10 lg:pt-[38px]'>
      <div className='mb-[14px] flex justify-between px-5 md:mb-11 lg:mb-[26px]'>
        <div className='flex flex-col gap-2 md:gap-4'>
          <Typography variant='l-bold' className='md:text-[32px] md:font-medium'>
            Интересное из&nbsp;блога
          </Typography>
          <Typography variant='m' className='md:text-[24px] md:text-grey-800'>
            {description_blog}
          </Typography>
        </div>

        <div className='lg:flex lg:items-center'>
          <Link
            href='/'
            className='flex gap-5 pr-1 lg:items-center lg:gap-5 lg:pr-4'
          >
            <Typography className='hidden md:block md:text-lg md:font-semibold'>
              Смотреть больше
            </Typography>
            <SvgSprite name='arrow-pointer' width={15} />
          </Link>
        </div>
      </div>

      <ul className='hide-scroll flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-[18px] pb-[18px] md:pb-7 lg:gap-1 lg:px-3'>
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className='min-h-[292px] min-w-[284px] md:min-h-[424px] md:min-w-[381px]'
          >
            <MyArticles isHorizontalOrientation />
          </li>
        ))}
      </ul>
    </div>
  );
}
