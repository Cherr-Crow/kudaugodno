export interface ITabBar {
  className?: string;
  tabs: string[];
  getTabName?: (tab: string) => void;
}
