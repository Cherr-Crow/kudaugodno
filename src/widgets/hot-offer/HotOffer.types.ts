import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'section'>;

export interface IHotOffer extends DivProps {
  title?: string;
  link?: string;
  array: IHotel[];
  type: 'hotel' | 'tour';
}
