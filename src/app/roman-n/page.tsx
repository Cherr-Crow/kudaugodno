import { PopupWindow } from '@/shared/popup-window';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { nanoid } from 'nanoid';
import React from 'react';

export default function RomanN() {
  return (
    <div className='h-screen w-screen p-4'>
      <div className='relative'>
        <h2 className='w-fit bg-slate-400'>'элемент PopupWindow'</h2>
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
        <h2 className='w-fit bg-slate-400'>'элемент SvgSprite'</h2>
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
        </div>
      </div>
      <div className='mt-4 flex flex-col items-center gap-4'>
        <h2 className='w-fit bg-slate-400'>'элемент Typography'</h2>
        <Typography children='h1 (60px/500)' variant='h1' />
        <Typography children='subtitle1 (60px/400)' variant='subtitle1' />
        <Typography children='h2 (48px/500)' variant='h2' />
        <Typography children='subtitle2 (48px/400)' variant='subtitle2' />
        <Typography children='h3 (40px/500)' variant='h3' />
        <Typography children='subtitle3 (40px/400)' variant='subtitle3' />
        <Typography children='h4 (32px/500)' variant='h4' />
        <Typography children='subtitle4 (32px/400)' variant='subtitle4' />
        <Typography children='h5 (24px/500)' variant='h5' />
        <Typography children='l (20px/400)' variant='l' />
        <Typography children='l-bold (20px/500)' variant='l-bold' />
        <Typography children='m (16px/400)' variant='m' />
        <Typography children='m-bold (16px/500)' variant='m-bold' />
        <Typography children='s (13px/400)' variant='s' />
        <Typography children='s-bold (13px/500)' variant='s-bold' />
        <Typography children='xs (11px/400)' variant='xs' />
        <Typography>default (16px/400) = variant='m'</Typography>
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
