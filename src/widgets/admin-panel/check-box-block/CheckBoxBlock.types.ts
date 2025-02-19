type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ICheckBoxBlock extends DivProps {
  title: string;
  checkboxes: string[];
  getNewList(list: string[]): void;
}
