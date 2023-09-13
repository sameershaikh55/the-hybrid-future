import { ReactNode } from "react";

export interface Props {
  label: ReactNode;
  value: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
