type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IPhotoBlock extends DivProps {
  photos: {
    id: number;
    photo: string;
    room?: number;
    hotel?: number;
  }[];
  additionPhoto(formData: FileList): void;
  deletePhoto(id: number): void;
}
