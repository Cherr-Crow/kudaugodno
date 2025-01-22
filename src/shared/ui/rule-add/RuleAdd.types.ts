type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRuleAdd extends DivProps {
  name: string;
  getValue: (val: { name: string; description: string; checked: boolean }) => void;
}
