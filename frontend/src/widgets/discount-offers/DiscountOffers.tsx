import { Typography } from '@/shared/ui/typography';

import { IDiscountOffersProps } from './DiscountOffers.types';

const mockData = {
  image: '/interesting-places-img.png',
  title: 'Китай',
  price: '100 000 ₽',
  discountedPrice: '80 000 ₽',
};
export function DiscountOffers({ className }: IDiscountOffersProps) {
  return (
    <div
      className={` ${className} w-[274px] rounded-[20px] border-[1px] border-grey-100 bg-white p-5 shadow-lg`}
    >
      <Typography variant='l-bold' className='mb-5 block'>
        Предложения со скидкой за бонусы
      </Typography>

      <div className='max-h-[680px] overflow-y-auto'>
        <ul className='flex flex-col gap-3'>
          {Array(15)
            .fill(mockData)
            .map((place, index) => (
              <li
                key={index}
                className='flex cursor-pointer gap-[14px] rounded-[12px] hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]'
              >
                <img
                  className='h-[48px] w-[78px]'
                  src={place.image}
                  alt='Иллюстрация'
                />
                <div className=''>
                  <Typography variant='m' className='text-grey-950'>
                    {place.title}
                  </Typography>
                  <div className='flex'>
                    <Typography
                      variant='s'
                      className='text-[12px] font-medium leading-8 text-red-primary-800'
                    >
                      от {place.discountedPrice}
                    </Typography>
                    <Typography
                      variant='s'
                      className='text-[12px] font-medium leading-8 text-grey-400 line-through'
                    >
                      {place.price}
                    </Typography>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
