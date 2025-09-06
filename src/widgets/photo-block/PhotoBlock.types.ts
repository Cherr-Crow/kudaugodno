type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IPhotoBlock extends DivProps {
  photos: {
    id: number;
    photo: string;
    room?: number;
    hotel?: number;
  }[];
  additionPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deletePhoto(id: number): void;
}
