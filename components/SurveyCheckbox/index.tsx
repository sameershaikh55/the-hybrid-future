import style from "./style.module.scss";
import { Props } from "./types";

const Checkbox: React.FC<Props> = ({
  value,
  handleChange,
  i,
  questions,
  option,
}) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {i === 0 && <div className={style.top_line}></div>}

      <div className={`${style["checkbox__wrapper"]} d-flex justify-content-center align-items-center h-100`}>
        <label className={style.checkbox}>
          <input
            type="checkbox"
            className={style["checkbox__input"]}
            checked={value}
            onChange={() => handleChange(option)}
          />
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

      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default Checkbox;
