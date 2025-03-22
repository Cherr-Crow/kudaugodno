import { ITour } from '@/types/tour-type';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IToursBlockPhoto extends DivProps {
  data: ITour[];
}
