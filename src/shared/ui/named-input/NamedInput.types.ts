type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface INamedInput extends DivProps {
  title?: string;
  placeholder: string;
  name: string;
  getValue: (val: string) => void;
}
