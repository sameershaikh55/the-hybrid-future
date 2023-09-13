export interface Props {
  backURL: string;
  nextURL: string;
  active?: boolean;
  chosenData: any;
}

export interface SessionStorageData {
  [key: string]: string;
}
