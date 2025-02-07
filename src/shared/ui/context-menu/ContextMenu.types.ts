type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IContextMenu extends DivProps {
  items: { label: string; action: (arg?: number | string) => void }[];
  visible: boolean;
  positionProp: { x: number; y: number };
}
