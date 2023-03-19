export interface Props {
  label: string;
  type?: string;
  value: string;
  name: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string;
}
