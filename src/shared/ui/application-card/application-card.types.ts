import { IApplication } from '@/types/application.type';
import { ITour } from '@/types/tour-type';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IApplicationCard extends DivProps {
  tour: ITour;
  application: IApplication;
  status: string;
}
