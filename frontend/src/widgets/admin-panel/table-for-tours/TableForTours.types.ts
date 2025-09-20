import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ITableForTours extends DivProps {
  tours: ITour[];
}
