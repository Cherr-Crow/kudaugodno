type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ICheckBoxBlock extends DivProps {
  title: string;
  checkboxes: { name: string }[];
  getNewList(list: { name: string }[]): void;
}
