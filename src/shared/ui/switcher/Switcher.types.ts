export interface ISwitcher {
  className?: string;
}

export interface SwitcherProps extends ISwitcher{
  label?: string; 
  isActive?: boolean;
  isDisabled?: boolean;
  onToggle?: (state: boolean) => void;
}
