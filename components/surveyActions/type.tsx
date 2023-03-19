export interface Props {
  backURL: string;
  nextURL: string;
  active?: boolean;
}

export interface SessionStorageData {
  [key: string]: string;
}
