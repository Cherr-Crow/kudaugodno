type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IInputDateForSearchBlock extends DivProps {
  placeholder: string;
  getValue(value: string): void;
}
