'use client';

import React, { useRef } from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IPhotoBlock } from './PhotoBlock.types';

export function PhotoBlock({
  photos,
  additionPhoto,
  deletePhoto,
  className,
}: IPhotoBlock) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useRef('photo-upload-input');

  return (
    <div className={className ?? ''}>
      <div className='flex gap-2'>
        <ul className='flex flex-wrap gap-5'>
          <li className='flex flex-col gap-1'>
            <Typography variant='l-bold'>Обложка</Typography>
            <form>
              <label
                // htmlFor='file'
                className='relative block h-32 w-32 cursor-pointer rounded-2xl border border-blue-600 md:h-[180px] md:w-[180px]'
              >
                <input
                  type='file'
                  accept='image/*,.jpg,.png,.jpeg'
                  // id='file'
                  className='h-20 w-20 cursor-pointer opacity-0'
                  onChange={additionPhoto}
                  ref={fileInputRef}
                />
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-blue-600'>
                  +
                </span>
              </label>
            </form>
          </li>
          {photos?.map((item, idx) => (
            <li className='flex flex-col justify-end gap-1' key={item.id ?? idx}>
              {idx === 0 && <Typography variant='l-bold'>Фотографии</Typography>}
              <div className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-[180px] md:w-[180px]'>
                <img
                  src={item.photo}
                  alt=''
                  className='h-full w-full'
                  rel='prefetch'
                />
                <div
                  className='absolute left-0 top-0 z-10 h-full w-full cursor-pointer bg-grey-700 opacity-0 hover:opacity-70'
                  onClick={() => deletePhoto(item.id)}
                >
                  <SvgSprite
                    name='trash-light'
                    width={24}
                    color='white'
                    className='relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  />
                </div>
              </div>
            </li>
          ))}
          <li className='flex flex-col justify-end gap-1'>
            {photos.length === 0 && (
              <Typography variant='l-bold'>Фотографии</Typography>
            )}
            <form>
              <label
                htmlFor={inputId.current}
                className='relative block h-24 w-24 cursor-pointer rounded-2xl border border-blue-600 md:h-[180px] md:w-[180px]'
              >
                <input
                  type='file'
                  accept='image/*,.jpg,.png,.jpeg'
                  id={inputId.current}
                  className='h-20 w-20 cursor-pointer opacity-0'
                  onChange={additionPhoto}
                  ref={fileInputRef}
                />
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-blue-600'>
                  +
                </span>
              </label>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}
