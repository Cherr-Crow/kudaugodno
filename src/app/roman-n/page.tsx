'use client';

import React from 'react';

import { nanoid } from 'nanoid';

import { Accordeon } from '@/shared/accordeon';
import { PopupWindow } from '@/shared/popup-window';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { Badge } from '@/shared/ui/badge';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { RadioButton } from '@/shared/ui/radio-button';
import { Select } from '@/shared/ui/select';
import { Switcher } from '@/shared/ui/switcher';
import { TabBar } from '@/shared/ui/tab-bar';

export default function RomanN() {
  return (
    <div className='w-screen bg-white p-32'>
      <div className='relative'>
        <h2 className='w-fit bg-blue-400'>элемент PopupWindow</h2>
        <PopupWindow className='top-15 left-3 px-4 py-5'>
          <ul className='w-fit'>
            {testList.map((option) => (
              <li key={nanoid()} className=''>
                {option}
              </li>
            ))}
          </ul>
        </PopupWindow>
        <PopupWindow className='left-40 top-24 px-2 py-3'>
          <h2 className=''>какой то подзаголовок</h2>
          <p className='text-sm'>текст для подзаголовка</p>
        </PopupWindow>
      </div>
      <div className='mt-60 flex flex-col items-center justify-center gap-3'>
        <h2 className='w-fit'>элемент SvgSprite</h2>
        <div className='flex flex-wrap gap-3'>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>entertainment</p>
            <SvgSprite name='entertainment' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>bus</p>
            <SvgSprite name='bus' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>icon_video</p>
            <SvgSprite name='icon_video' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>icon_document</p>
            <SvgSprite name='icon_document' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>trash-light</p>
            <SvgSprite name='trash-light' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>plant</p>
            <SvgSprite name='plant' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>sort</p>
            <SvgSprite name='sort' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>tennis-racket</p>
            <SvgSprite name='tennis-racket' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>airplane</p>
            <SvgSprite name='airplane' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>arrow-pointer</p>
            <SvgSprite name='arrow-pointer' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>bell</p>
            <SvgSprite name='bell' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>calendar</p>
            <SvgSprite name='calendar' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>firecracker</p>
            <SvgSprite name='firecracker' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>waves</p>
            <SvgSprite name='waves' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>warning</p>
            <SvgSprite name='warning' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>user</p>
            <SvgSprite name='user' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>telegram</p>
            <SvgSprite name='telegram' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>star</p>
            <SvgSprite name='star' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>star-full</p>
            <SvgSprite name='star-full' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>sofa</p>
            <SvgSprite name='sofa' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>phone</p>
            <SvgSprite name='phone' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>ru</p>
            <SvgSprite name='ru' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>gb</p>
            <SvgSprite name='gb' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>like-bold</p>
            <SvgSprite name='like-bold' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>location</p>
            <SvgSprite name='location' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>magic-wand</p>
            <SvgSprite name='magic-wand' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>mail</p>
            <SvgSprite name='mail' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>arrow</p>
            <SvgSprite name='arrow' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>cross</p>
            <SvgSprite name='cross' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>fire</p>
            <SvgSprite name='fire' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>image</p>
            <SvgSprite name='image' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>lightning</p>
            <SvgSprite name='lightning' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>list</p>
            <SvgSprite name='list' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>heart-outline</p>
            <SvgSprite name='heart-outline' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>search</p>
            <SvgSprite name='search' width={30} />
          </div>
          {/**/}
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-animals-allowed</p>
            <SvgSprite name='amenity-animals-allowed' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-cart-restaurant</p>
            <SvgSprite name='amenity-cart-restaurant' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-check-in</p>
            <SvgSprite name='amenity-check-in' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-family-room</p>
            <SvgSprite name='amenity-family-room' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-pool</p>
            <SvgSprite name='amenity-pool' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-spa</p>
            <SvgSprite name='amenity-spa' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>amenity-wifi</p>
            <SvgSprite name='amenity-wifi' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>our_advantage_1</p>
            <SvgSprite name='our_advantage_1' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>our_advantage_2</p>
            <SvgSprite name='our_advantage_2' width={30} />
          </div>
          <div className='flex flex-col items-center justify-center gap-2 rounded-lg border p-2'>
            <p className=''>our_advantage_3</p>
            <SvgSprite name='our_advantage_3' width={30} />
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center gap-4'>
        <h2 className='w-fit bg-blue-bold text-white'>элемент Typography</h2>
        <Typography variant='h1'>h1 (60px/500)</Typography>
        <Typography variant='subtitle1'>subtitle1 (60px/400)</Typography>
        <Typography variant='h2'>h2 (48px/500)</Typography>
        <Typography variant='subtitle2'>subtitle2 (48px/400)</Typography>
        <Typography variant='h3'>h3 (40px/500)</Typography>
        <Typography variant='subtitle3'>subtitle3 (40px/400)</Typography>
        <Typography variant='h4'>h4 (32px/500)</Typography>
        <Typography variant='subtitle4'>subtitle4 (24px/400)</Typography>
        <Typography variant='h5'>h5 (24px/500)</Typography>
        <Typography variant='l'>l (20px/400)</Typography>
        <Typography variant='l-bold'>l-bold (20px/500)</Typography>
        <Typography variant='m'>m (16px/400)</Typography>
        <Typography variant='m-bold'>m-bold (16px/500)</Typography>
        <Typography variant='s'>s (13px/400)</Typography>
        <Typography variant='s-bold'>s-bold (13px/500)</Typography>
        <Typography variant='xs'>xs (11px/400)</Typography>
        <Typography>default (16px/400) = variant=m</Typography>
      </div>
      <div className='mt-4 pb-10'>
        <h2 className='w-fit bg-blue-400'>элемент TabBar</h2>
        <TabBar tabs={tabsTestList} svgTab={[]} getActiveTab={() => {}} />
        <TabBar
          tabs={tabsTestList2}
          className='mt-4'
          svgTab={[]}
          getActiveTab={() => {}}
        />
      </div>
      <div className='mt-4 pb-10'>
        <h2 className='w-fit bg-blue-400'>элемент Select</h2>
        <div className='flex'>
          <Select options={testList} />
          <Select options={testList} color='blue' />
          <Select options={tabsTestList} color='green' />
        </div>
      </div>
      <div className='mt-4 h-20 w-full'>dd</div>
      <div className=''>
        <h2 className='w-fit bg-blue-400'>элемент Badge</h2>
        <div className='flex gap-3'>
          <Badge name='Макао' price='от 23 342 ₽' />
          <Badge name='Тайланд' price='от 347 345 ₽' size='small' />
        </div>
      </div>
      <div className='mt-4'>
        <h2 className='mb-3 w-fit bg-blue-400 p-2'>элемент ButtonCustom</h2>
        <div className='flex gap-4'>
          <ButtonCustom variant='primary' size='l'>
            <Typography variant='s-bold'>
              Сюда можно вставлять всё что угодно
            </Typography>
          </ButtonCustom>
          <ButtonCustom variant='primary' size='l' disabled>
            <div className='flex items-center gap-3'>
              <SvgSprite name='mail' width={30} />
              <Typography variant='h4'>Отправить</Typography>
            </div>
          </ButtonCustom>
          <ButtonCustom variant='primary' size='m'>
            <Typography>текст</Typography>
          </ButtonCustom>
          <ButtonCustom variant='primary' size='s'>
            <Typography>текст</Typography>
          </ButtonCustom>
        </div>
        <div className='flex gap-4'>
          <ButtonCustom variant='secondary' size='l'>
            <Typography variant='s-bold'>
              Сюда можно вставлять всё что угодно
            </Typography>
          </ButtonCustom>
          <ButtonCustom variant='tetriary' size='m'>
            <div className='flex items-center gap-3'>
              <SvgSprite name='tennis-racket' width={30} />
              <Typography variant='m-bold'>Отправить</Typography>
            </div>
          </ButtonCustom>
          <ButtonCustom variant='danger' size='m'>
            <Typography>текст</Typography>
          </ButtonCustom>
          <ButtonCustom variant='wzhuh' size='s'>
            <div className='flex items-center gap-2'>
              <Typography className='text-white'>Вжух</Typography>
              <SvgSprite name='magic-wand' width={20} color='#fff' />
            </div>
          </ButtonCustom>
        </div>
      </div>
      <div className={`mb-5`}>
        <label>Switcher</label>
        <Switcher />
        <label>Switcher disabled</label>
        <Switcher isDisabled={true} />
        <label>Switchers active by default</label>
        <Switcher isActive={true} />
      </div>
      <div className={`mb-5`}>
        <label>Checkbox</label>
        <Checkbox label='Checkbox text' />
        <label>Checkbox disabled</label>
        <Checkbox label='Checkbox text' isDisabled={true} />
        <label>Switchers active by default</label>
        <Checkbox label='Checkbox text' isChecked={true} />
      </div>
      <div>
        <label>RadioButton</label>
        <RadioButton label='RadioButton text' />
        <label>RadioButton disabled</label>
        <RadioButton label='RadioButton text' isDisabled={true} />
        <label>Switchers active by default</label>
        <RadioButton label='RadioButton text' isSelected={true} />
      </div>
      <div className='mt-4'>
        <h2 className='mb-3 w-fit bg-blue-400 p-2'>элемент Accordeon</h2>
        <Accordeon title='test'>
          <p>This is the content of section 1.</p>
        </Accordeon>
      </div>
    </div>
  );
}

const testList = [
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 6',
  'option 7',
];
const tabsTestList = ['Отель', 'Номера', 'Даты', 'Всё что угодно'];
const tabsTestList2 = ['разные названия', 'адаптивный'];
