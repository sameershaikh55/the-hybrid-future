export interface SelectOption {
  option_id: number;
  option_label: string;
  optional: boolean;
  position: number;
}

export interface HandleChange {
  heading: string;
  selectedOption: SelectOption;
}

export interface Props {
  options: SelectOption[];
  onChange: (e: HandleChange) => void;
  questions: number;
  i: number;
  heading: string;
  values: HandleChange[];
}
