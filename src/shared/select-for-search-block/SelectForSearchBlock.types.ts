type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISelectForSearchBlock extends DivProps {
  getValue?: (value: string) => void;
}
