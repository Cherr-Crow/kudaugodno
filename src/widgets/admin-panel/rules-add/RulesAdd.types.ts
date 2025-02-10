type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRulesAdd extends DivProps {
  getRules(val: Rule): void;
}

type Rule = { name: string; description: string }[];
