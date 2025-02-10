type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface INamedInput extends DivProps {
  title?: string;
  placeholder?: string;
  name: string;
  getValue: (val: string | number) => void;
  type?: 'text' | 'time' | 'number';
  startValue?: string | number;
}
