'use client';

import React from 'react';

import { Accordeon } from '@/shared/accordeon';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { Select } from '@/shared/ui/select';
import { CheckBoxBlock } from '@/widgets/admin-panel/check-box-block';
import { PhotoBlock } from '@/widgets/admin-panel/photo-block';

export default function Rooms() {
  const handle = () => {};

  return (
    <div className='flex flex-col gap-4'>
      <Accordeon title='Стандартные' className=''>
        <div className='flex flex-col gap-4 p-5'>
          <div className='flex flex-col gap-5 rounded-2xl border border-grey-200 p-5 shadow-md shadow-grey-500'>
            <div className='flex items-center justify-between'>
              <Typography variant='h4'>ID# __</Typography>
              <ButtonCustom variant='danger' size='s'>
                <Typography className='text-red-primary-800' variant='m-bold'>
                  Удалить номер
                </Typography>
              </ButtonCustom>
            </div>

            <Accordeon opened={true} title='Общие'>
              <div className='flex flex-col gap-5 p-5'>
                <div className='grid grid-cols-4 items-center gap-3'>
                  <div>
                    <Typography variant='l-bold'>Категория номера</Typography>
                    <Select
                      options={[
                        'Стандарт',
                        'Полулюкс',
                        'Люкс',
                        'Апартаменты',
                        'Студия',
                      ]}
                      color='blue'
                      size='small'
                      className='mt-3 w-full'
                    />
                  </div>
                  <div>
                    <Typography variant='l-bold'>Тип питания</Typography>
                    <Select
                      options={[
                        'Без питания',
                        'Только завтрак',
                        'Полупансион',
                        'Полный пансион',
                        'Все включено',
                        'Ультра все включено',
                      ]}
                      color='blue'
                      size='small'
                      className='mt-3 w-full'
                    />
                  </div>
                  <NamedInput name='Цена' title='Цена' getValue={handle} />
                  <NamedInput
                    name='Цена со скидкой'
                    title='Цена со скидкой'
                    getValue={handle}
                  />
                </div>

                <div className='grid grid-cols-3 gap-3'>
                  <NamedInput
                    name='Количество взрослых'
                    title='Количество проживающих взрослых'
                    getValue={handle}
                  />
                  <NamedInput
                    name='Количество детей'
                    title='Количество проживающих детей'
                    getValue={handle}
                  />
                  <NamedInput
                    name='Количество одноместных кроватей'
                    title='Количество одноместных кроватей'
                    getValue={handle}
                  />
                  <NamedInput
                    name='Количество двухместных кроватей'
                    title='Количество двухместных кроватей'
                    getValue={handle}
                  />
                  <NamedInput name='Площадь' title='Площадь, м²' getValue={handle} />
                  <NamedInput
                    name='Количество номеров'
                    title='Количество номеров данного типа'
                    getValue={handle}
                  />
                </div>

                <div className=''>
                  <Typography variant='l-bold'>Скидки:</Typography>
                  <div className='flex gap-3'>
                    <NamedInput
                      name='Наименование'
                      placeholder='Наименование'
                      getValue={handle}
                    />
                    <NamedInput
                      name='Процент скидки'
                      placeholder='Процент скидки'
                      getValue={handle}
                    />
                    <InputDateForSearchBlock
                      placeholder='С какого действует'
                      getValue={handle}
                      className='rounded-md border border-blue-600'
                    />
                    <InputDateForSearchBlock
                      placeholder='До какого действует'
                      getValue={handle}
                      className='rounded-md border border-blue-600'
                    />
                  </div>
                </div>

                <div className=''>
                  <Typography variant='l-bold'>
                    Недоступны для бронирования по техническим причинам:
                  </Typography>
                  <div className='flex gap-3'>
                    <NamedInput
                      name='Причина'
                      placeholder='Причина'
                      getValue={handle}
                    />
                    <InputDateForSearchBlock
                      placeholder='С какого не доступен'
                      getValue={handle}
                      className='rounded-md border border-blue-600'
                    />
                    <InputDateForSearchBlock
                      placeholder='До какого не доступен'
                      getValue={handle}
                      className='rounded-md border border-blue-600'
                    />
                  </div>
                </div>

                <PhotoBlock idHotel={0} />
              </div>
            </Accordeon>
            <Accordeon opened={true} title='Удобства'>
              <div className='p-5'>
                <CheckBoxBlock
                  title='Общие'
                  checkboxes={[
                    { name: 'Бесплатный интернет' },
                    { name: 'Вид на море' },
                  ]}
                  getNewList={() => {}}
                  className='bg-blue-50'
                />
                <CheckBoxBlock
                  title='Кофе-станция'
                  checkboxes={[
                    { name: 'Бесплатный интернет' },
                    { name: 'Вид на море' },
                  ]}
                  getNewList={() => {}}
                />
                <CheckBoxBlock
                  title='В ванной комнате'
                  checkboxes={[
                    { name: 'Бесплатный интернет' },
                    { name: 'Вид на море' },
                  ]}
                  getNewList={() => {}}
                  className='bg-blue-50'
                />
                <CheckBoxBlock
                  title='Вид'
                  checkboxes={[
                    { name: 'Бесплатный интернет' },
                    { name: 'Вид на море' },
                  ]}
                  getNewList={() => {}}
                />
              </div>
            </Accordeon>
            <ButtonCustom variant='primary' size='s' className='ml-auto'>
              <Typography variant='m-bold'>Сохранить изменения</Typography>
            </ButtonCustom>
          </div>
        </div>
      </Accordeon>
    </div>
  );
}
