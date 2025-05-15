import { IHotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IToursBlockPhoto extends DivProps {
  hotel: IHotel | null;
}
