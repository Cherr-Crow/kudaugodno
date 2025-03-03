type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IDiscountBlock extends DivProps {
  startData: oneDiscount[];
  getData(data: oneDiscount[]): void;
}

type oneDiscount = {
  name: string;
  size: number;
  start_date: string;
  end_date: string;
};
