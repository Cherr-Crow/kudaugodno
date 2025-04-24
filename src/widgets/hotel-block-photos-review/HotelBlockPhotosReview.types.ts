import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBlockPhotosReview extends DivProps {
  hotel: IHotel;
}
