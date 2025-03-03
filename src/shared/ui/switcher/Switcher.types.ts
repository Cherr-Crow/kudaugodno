export interface ISwitcher {
  className?: string;
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onToggle?: (state: boolean) => void;
}
