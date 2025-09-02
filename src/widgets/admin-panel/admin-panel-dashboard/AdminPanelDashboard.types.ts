type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IAdminPanelDashboard extends DivProps {
  type: 'tourist' | 'tour-operator';
}
