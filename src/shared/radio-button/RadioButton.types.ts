export interface IRadioButton {
  className?: string;
  label?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onChange?: (selected: boolean) => void;
}
