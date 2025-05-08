type DivProps = React.ComponentPropsWithoutRef<'section'>;

export interface IHotOffer extends DivProps {
  link?: string;
  type: 'hotel' | 'tour';
}
