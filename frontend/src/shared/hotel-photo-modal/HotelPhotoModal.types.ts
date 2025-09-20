import { photoType } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelPhotoModal extends DivProps {
  name: string;
  star_category: number;
  user_rating: number;
  country: string;
  city: string;
  photos: photoType[];
}
