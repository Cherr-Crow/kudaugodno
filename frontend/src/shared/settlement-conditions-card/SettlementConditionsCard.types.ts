type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISettlementConditionsCard extends DivProps {
  check_in_time: string;
  check_out_time: string;
  onShowModal: () => void;
}
