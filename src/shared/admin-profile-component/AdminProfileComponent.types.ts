type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IAdminProfileComponent extends DivProps {
  type: 'tourist' | 'tour-operator' | 'hotelier';
}
