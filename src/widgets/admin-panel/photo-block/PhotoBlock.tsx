import React, { useRef } from 'react';

import { nanoid } from 'nanoid';

import {
  useAddPhotoHotelMutation,
  useDelPhotoHotelMutation,
  useGetPhotosHotelQuery,
} from '@/servicesApi/hotelsApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IPhotoBlock } from './PhotoBlock.types';

export function PhotoBlock({ idHotel, className }: IPhotoBlock) {
  const { data } = useGetPhotosHotelQuery(idHotel);
  const [addPhoto] = useAddPhotoHotelMutation();
  const [delPhoto] = useDelPhotoHotelMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!fileInputRef.current) return;

    const formData = new FormData();

    const file = fileInputRef.current.files ? fileInputRef.current.files[0] : null;
    if (file) {
      formData.append('photo', file);
    } else {
      console.error('No file selected');
      return;
    }
    try {
      await addPhoto({ body: formData, id: idHotel }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelPhoto = async (id: number) => {
    await delPhoto({ hotel_id: idHotel, photo_id: id });
  };

  return (
    <div className={`${className ?? ''}`}>
      <Typography variant='l-bold'>Фотографии</Typography>
      <div className='flex gap-2'>
        <ul className='flex gap-2'>
          {data &&
            data.results.map((item) => (
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
                  onClick={() => handleDelPhoto(item.id)}
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
        </ul>
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
      </div>
    </div>
  );
}
