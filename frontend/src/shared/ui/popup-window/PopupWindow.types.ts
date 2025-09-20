import React from 'react';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IPopupWindow extends DivProps {
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  onClose?: () => void;
}
