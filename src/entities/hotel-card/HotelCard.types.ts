import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'article'>;

export interface IHotelCard extends DivProps {
  hotel: IHotel;
}
