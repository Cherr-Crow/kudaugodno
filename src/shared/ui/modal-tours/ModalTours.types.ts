type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IModalTours extends DivProps {
  type: 'comfort' | 'checkIn' | 'tour' | 'trip';
}
