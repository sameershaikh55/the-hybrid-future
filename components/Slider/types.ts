export interface HandleChange {
  heading: string;
  percentage: number;
}

export interface Props {
  heading: string;
  questions: number;
  percentage: number;
  i: number;
  onChange: (e: HandleChange) => void;
  totalPercentage: number;
}
