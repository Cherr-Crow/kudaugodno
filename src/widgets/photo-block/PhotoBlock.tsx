'use client';

import React, { useRef } from 'react';

import { nanoid } from 'nanoid';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IPhotoBlock } from './PhotoBlock.types';

export function PhotoBlock({
  photos,
  additionPhoto,
  deletePhoto,
  className,
}: IPhotoBlock) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    additionPhoto(e.target.files);
  };

  return (
    <div className={className ?? ''}>
      <Typography variant='l-bold'>Фотографии</Typography>
      <div className='flex gap-2'>
        <ul className='flex flex-wrap gap-2'>
          {photos?.map((item) => (
            <li
              className='relative h-24 w-24 overflow-hidden rounded-2xl border md:h-32 md:w-32'
              key={nanoid()}
            >
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
            </li>
          ))}
          <li>
            <form>
              <label
                htmlFor='file'
                className='relative block h-24 w-24 cursor-pointer rounded-2xl border border-blue-600 md:h-32 md:w-32'
              >
                <input
                  type='file'
                  accept='image/*,.jpg,.png,.jpeg'
                  id='file'
                  className='h-20 w-20 cursor-pointer opacity-0'
                  onChange={handleAddPhoto}
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
