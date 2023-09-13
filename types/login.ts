export interface FormErrors {
    [key: string]: string;
};


export interface formData {
    email: string;
    password: string
}

export interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}