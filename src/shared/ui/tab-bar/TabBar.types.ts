export interface ITabBar {
  className?: string;
  tabs: string[];
  getTabName?: (tab: string) => void;
  svgTab?: svgTabType;
  colorHero?: string;
  tabIndex?: (tab: string) => void;
}

export type svgTabType = Array<
  | 'airplane'
  | 'sofa'
  | 'image'
  | 'entertainment'
  | 'bus'
  | 'icon_document'
  | 'icon_video'
  | 'trash-light'
  | 'plant'
  | 'tennis-racket'
  | 'sort'
  | 'arrow-pointer'
  | 'bell'
  | 'calendar'
  | 'heart-outline'
>;
