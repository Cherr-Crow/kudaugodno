import { Hotel } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISearchTour extends DivProps {
  type: 'Туры' | 'Отели';
  hotel?: Hotel | null;
}
