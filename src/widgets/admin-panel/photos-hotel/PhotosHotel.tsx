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

  const handleAddPhoto = async (fileList: FileList) => {
    if (!hotelId) return;
    const formData = new FormData();
    formData.append('photo', fileList[0]);
    try {
      await addPhoto({ body: formData, id: +hotelId }).unwrap();
    } catch (error) {
      console.error('Ошибка при добавлении фото:', error);
    }
  };

  const handleDelPhoto = async (id: number) => {
    if (!hotelId) return;
    await delPhoto({ hotel_id: +hotelId, photo_id: id });
  };

  if (!data) return null;

  return (
    <PhotoBlock
      photos={data.results}
      additionPhoto={handleAddPhoto}
      deletePhoto={handleDelPhoto}
    />
  );
}
