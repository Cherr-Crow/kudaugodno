import { IHotel } from '@/types/hotel';
import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IOtherTours extends DivProps {
  hotel?: IHotel | null;
  tours?: ITour[] | null;
}
