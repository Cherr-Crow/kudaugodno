type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IAuthState extends DivProps {
  onStageChange: (stage: 'email' | 'code') => void;
}
