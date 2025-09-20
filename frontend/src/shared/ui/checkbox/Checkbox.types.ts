export interface ICheckbox {
  id?: string;
  className?: string;
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: string;
}
