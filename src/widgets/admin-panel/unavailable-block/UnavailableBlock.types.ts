type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IUnavailableBlock extends DivProps {
  startData: oneUnavailable[];
  getData(data: oneUnavailable[]): void;
}

type oneUnavailable = {
  id?: number;
  reason: string;
  start_date: string;
  end_date: string;
};
