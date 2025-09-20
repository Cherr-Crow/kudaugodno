type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISettlementConditionsModal extends DivProps {
  check_in_time: string;
  check_out_time: string;
}
