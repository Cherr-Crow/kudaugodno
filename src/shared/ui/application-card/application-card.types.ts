import { IApplication } from '@/types/application';
import { ITour } from '@/types/tour';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IApplicationCard extends DivProps {
  tour: ITour;
  application: IApplication;
  status: string;
}
