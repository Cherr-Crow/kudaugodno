export interface ITypography {
  className?: string;
  children: React.ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'subtitle1'
    | 'subtitle2'
    | 'subtitle3'
    | 'subtitle4'
    | 'l'
    | 'm'
    | 's'
    | 'xs'
    | 'l-bold'
    | 'm-bold'
    | 's-bold';
}
