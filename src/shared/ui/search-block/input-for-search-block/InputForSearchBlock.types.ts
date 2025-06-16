type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IInputForSearchBlock extends DivProps {
  placeholder: string;
  getValue: (value: string) => void;
  value?: string;
  type?: string;
}
