import { useState, useRef } from "react";
import PasswordValidation from "../passwordValidation";
import style from "./style.module.scss";
import { Props } from "./types";

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
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // function to handle focus event
  const handleFocus = () => {
    setIsFocused(true);
  };

  // function to handle blur event
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <label
      className={`${style["input_field"]} ${
        error && style.errorField
      } ${className} position-relative`}
    >
      {/* icon for password show/hide toggle */}
      <div
        className={`position-absolute ${style.icon} pointer`}
        onClick={() => setIsShow(!isShow)}
      >
        {!error && label === "Password" && (
          <>
            {isShow ? (
              <img src="/assets/showPassword.svg" alt="" />
            ) : (
              <img src="/assets/hidePassword.svg" alt="" />
            )}
          </>
        )}
      </div>

      {/* icon for error display */}
      {error && (
        <img
          className={`position-absolute ${style.errorIcon} pointer`}
          src="/assets/error.svg"
          alt=""
        />
      )}

      {/* Input field */}
      <input
        ref={inputRef}
        type={label === "Password" ? (isShow && "text") || "password" : type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {/* Error message for input field */}
      {error && <div className={`${style.error} f12 fw500`}>*{error}</div>}

      {/* Password validation component */}
      {validation && isFocused && (
        <PasswordValidation passValidation={passValidation} />
      )}
    </label>
  );
};

export default Input;
