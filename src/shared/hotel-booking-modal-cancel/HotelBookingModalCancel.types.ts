type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelBookingModalCancel extends DivProps {
  isOpen: boolean;
  onClose: () => void;
}
