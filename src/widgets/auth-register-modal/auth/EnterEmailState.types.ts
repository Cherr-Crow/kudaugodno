type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IEnterEmailState extends DivProps {
  onEmailConfirmed: () => void;
}
