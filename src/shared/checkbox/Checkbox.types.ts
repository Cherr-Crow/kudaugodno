export interface ICheckbox {
  className?: string;
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (checked: boolean) => void;
}
