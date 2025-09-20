export interface IPhotoCarousel {
  photos: { photo: string }[];
  className?: string; //(размеры и прочее)
  buttonPositionClass?: string; // позиция кнопок (типа, 'top-1/2 -translate-y-1/2' или 'top-[80%]')
}
