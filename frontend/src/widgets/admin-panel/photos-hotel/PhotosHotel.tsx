import React from 'react';

import { useSearchParams } from 'next/navigation';

import {
  useAddPhotoHotelMutation,
  useDelPhotoHotelMutation,
  useGetPhotosHotelQuery,
} from '@/servicesApi/hotelsApi';

import { IPhotosHotel } from './PhotosHotel.types';
import { PhotoBlock } from '../../photo-block';

export function PhotosHotel({}: IPhotosHotel) {
  const hotelId = useSearchParams().get('id');
  const { data } = useGetPhotosHotelQuery(+hotelId!);
  const [addPhoto] = useAddPhotoHotelMutation();
  const [delPhoto] = useDelPhotoHotelMutation();

  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hotelId || !e.target.files?.length) return;
    const formData = new FormData();
    formData.append('photo', e.target.files[0]);
    try {
      await addPhoto({ body: formData, id: +hotelId }).unwrap();
      console.log('Фото добавлено!');
      if (e.target) e.target.value = ''; // сбросить input
    } catch (error) {
      console.error('Ошибка при добавлении фото:', error);
    }
  };

  const handleDelPhoto = async (id: number) => {
    if (!hotelId) return;
    await delPhoto({ hotel_id: +hotelId, photo_id: id });
  };

  if (data && data.length > 0) {
    return (
      <PhotoBlock
        photos={data}
        additionPhoto={handleAddPhoto}
        deletePhoto={handleDelPhoto}
      />
    );
  }

  return (
    <PhotoBlock
      photos={[]}
      additionPhoto={handleAddPhoto}
      deletePhoto={handleDelPhoto}
    />
  );
}
