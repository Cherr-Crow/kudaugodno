type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingModalConfirm extends DivProps {
  isOpen: boolean;
  onClose: () => void;
}
