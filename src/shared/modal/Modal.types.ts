type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IModal extends DivProps {
  children: React.ReactNode;
  close?: (arg: boolean) => void;
}
