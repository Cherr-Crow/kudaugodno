import { NameSvg } from '@/shared/svg-sprite/SvgSprite.types';

type UlProps = Omit<React.ComponentPropsWithoutRef<'ul'>, 'tabIndex'>;

export interface ITabBar extends UlProps {
  tabs: string[];
  svgTab?: NameSvg[];
  setTab?: string;
  tabIndex?: (tab: string) => void;
  getActiveTab(tab: string): void;
  variant?: 'primary' | 'secondary';
}
