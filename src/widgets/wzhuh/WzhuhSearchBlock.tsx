import { useState } from 'react';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

export function WzhuhSearchBlock({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className='flex flex-col items-center justify-center rounded-[20px] px-4 pb-10 pt-[42px] text-grey-950 md:px-0 md:pb-10 md:pt-[49px] lg:pb-[45px] lg:pt-[42px]'>
      <div className='mb-10 text-center md:mb-10 md:max-w-[640px]'>
        <Typography
          variant='h2'
          className='mb-[18px] text-[32px] font-semibold md:mb-[26px] md:text-[48px] lg:mb-4 lg:text-[60px]'
        >
          &laquo;Куда угодно&raquo;
        </Typography>
        <Typography variant='m' className='md:text-xl md:leading-8'>
          Наш генератор поможет выбрать направление для путешествия&nbsp;&mdash;
          будь&nbsp;то на&nbsp;пляж искупаться, изучить горы Кавказа или просто
          короткий отдых на&nbsp;выходные, после которого ты&nbsp;будешь чувствовать
          себя лучше всех.
          <br />
          Вжух!
        </Typography>
      </div>

      <form
        action=''
        className='flex w-full justify-between rounded-[40px] bg-white px-1 py-1 pl-4 shadow-md md:max-w-[367px]'
      >
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='pl-[30px] focus:outline-none focus-visible:outline-none md:rounded-[40px]'
          placeholder='Откуда'
        />
        <ButtonCustom
          variant='primary'
          size='m'
          className='py-[14px] md:py-5'
          onClick={handleSubmit}
        >
          <Typography variant='m-bold' className='text-green-950 md:text-xl'>
            Найти
          </Typography>
        </ButtonCustom>
      </form>
    </div>
  );
}
