type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IModal extends DivProps {
  children: React.ReactNode;
  isOpen: boolean;
  getState(open: boolean): void;
  err?: boolean;
  isNewVariation?: boolean;
  hasScrollbar?: boolean;
  auth?: boolean;
}
