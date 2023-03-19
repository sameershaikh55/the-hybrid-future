// Importing styles from the SCSS module and the Props interface from a separate file
import style from "./style.module.scss";
import { Props } from "./types";

// Creating a functional component named Checkbox that receives props
const Checkbox: React.FC<Props> = ({
  value,
  handleChange,
  i,
  questions,
  option,
}) => {
  return (
    // Wrapping the component in a div with flexbox styling for alignment and height control
    <div className="d-flex flex-column justify-content-between h-100">
      {/* Rendering a top line with custom style if it's the first checkbox */}
      {i === 0 && <div className={style.top_line}></div>}

      {/* Wrapping the checkbox label in a div with flexbox styling for alignment and height control */}
      <div
        className={`${style["checkbox__wrapper"]} d-flex justify-content-center align-items-center h-100`}
      >
        {/* Creating the checkbox input with custom style and checked value */}
        <label className={style.checkbox}>
          <input
            type="checkbox"
            className={style["checkbox__input"]}
            checked={value}
            onChange={() => handleChange(option)}
          />
          {/* Adding the SVG checkmark icon with custom style */}
          <span className={style["checkbox__check"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={style["checkbox__svg"]}
            >
              <path d="M 1 7 L 4 10 L 10 2" fill="none" />
            </svg>
          </span>
        </label>
      </div>

      {/* Rendering a bottom line with custom style if it's not the last checkbox */}
      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {/* Rendering a different bottom line with custom style if it's the last checkbox */}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

// Exporting the Checkbox component as default
export default Checkbox;
