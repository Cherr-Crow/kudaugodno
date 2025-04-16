type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface ISearchBlock extends DivProps {
  tab?: 'Туры' | 'Отели';
  setTab?: (tab: 'Туры' | 'Отели') => void;
}
