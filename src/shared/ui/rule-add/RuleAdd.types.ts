type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRuleAdd extends DivProps {
  rule: {
    name: string;
    description: string;
  };
  getValue: (val: Rule) => void;
}

export type Rule = {
  name: string;
  description: string;
  checked: boolean;
};
