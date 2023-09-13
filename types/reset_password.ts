export interface FormErrors {
  [key: string]: string;
}

export interface formData {
  email: string;
}

export interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}
