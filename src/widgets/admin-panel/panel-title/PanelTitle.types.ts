type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IPanelTitle extends DivProps {
  type: 'tourist' | 'tour-operator' | 'hotelier';
}
