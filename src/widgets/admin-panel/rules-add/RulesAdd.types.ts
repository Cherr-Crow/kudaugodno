type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRulesAdd extends DivProps {
  oldRules?: Rule;
  getRules(val: Rule): void;
}

type Rule = { name: string; description: string }[];
