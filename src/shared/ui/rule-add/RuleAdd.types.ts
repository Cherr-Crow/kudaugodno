type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRuleAdd extends DivProps {
  name: string;
  getValue: (val: Rule) => void;
}

export type Rule = {
  name: string;
  description: string;
  checked: boolean;
};
