import { useState, useRef } from "react";
import PasswordValidation from "../PasswordValidation";
import style from "./style.module.scss";

interface Props {
  label: string;
  type?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  validation?: boolean;
  passValidation?:  number[];
}

const Input: React.FC<Props> = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  className,
  error,
  validation,
  passValidation,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isPasswordField = ["Password", "Confirm Password"].includes(label);

  return (
    <label
      className={`${style.input_field} ${
        error && style.errorField
      } ${className} position-relative`}
    >
      <div
        className={`position-absolute ${style.icon} pointer`}
        onClick={() => setIsShow(!isShow)}
      >
        {!error && isPasswordField && (
          <img src={`/assets/${isShow ? "showPassword" : "hidePassword"}.svg`} alt="" />
        )}
      </div>

      {error && (
        <img
          className={`position-absolute ${style.errorIcon} pointer`}
          src="/assets/error.svg"
          alt="Error"
        />
      )}

      <input
        ref={inputRef}
        type={isPasswordField ? (isShow ? "text" : "password") : type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {error && <div className={`${style.error} f12 fw500`}>*{error}</div>}

      {validation && isFocused && (
        <PasswordValidation passValidation={passValidation} />
      )}
    </label>
  );
};

export default Input;
