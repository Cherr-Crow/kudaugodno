import React, { memo } from 'react';

import {
  useAddPhotoRoomMutation,
  useDelPhotoRoomMutation,
  useGetPhotosRoomQuery,
} from '@/servicesApi/hotelsApi';

import { IPhotosRoom } from './PhotosRoom.types';
import { PhotoBlock } from '../../photo-block';

export const PhotosRoom = memo(function PhotosRoom({ idRoom }: IPhotosRoom) {
  const { data } = useGetPhotosRoomQuery(idRoom);
  const [addPhoto] = useAddPhotoRoomMutation();
  const [delPhoto] = useDelPhotoRoomMutation();

  const handleAddPhoto = async (fileList: FileList) => {
    const formData = new FormData();
    formData.append('photo', fileList[0]);
    try {
      await addPhoto({ body: formData, id: idRoom }).unwrap();
    } catch (error) {
      console.error('Ошибка при добавлении фото:', error);
    }
  };

  const handleDelPhoto = async (id: number) => {
    await delPhoto({ room_id: idRoom, photo_id: id });
  };

  if (!data) return null;

  return (
    <PhotoBlock
      photos={data.results}
      additionPhoto={handleAddPhoto}
      deletePhoto={handleDelPhoto}
    />
  );
});
