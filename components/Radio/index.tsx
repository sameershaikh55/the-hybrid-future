import style from "./style.module.scss";
import { Props } from "./types";

const Radio: React.FC<Props> = ({ questions, i, onChange, active, option }) => {
  const isFirstItem = i === 0;
  const isLastItem = i + 1 === questions;

  const handleChange = () => onChange({ selectedOption: option });

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {isFirstItem && <div className={style.top_line}></div>}

      <div className="h-100 d-flex flex-column justify-content-center">
        <div
          style={{ height: "68px" }}
          className="f32 text-center fw700 color6 mb-0 d-flex justify-content-center align-items-center"
        >
          <input
            type="radio"
            checked={active}
            className={style.radio}
            onChange={handleChange}
          />
        </div>
      </div>

      {isLastItem ? (
        <div className={style.bottom_line_d}></div>
      ) : (
        <div className={style.bottom_line}></div>
      )}
    </div>
  );
};

export default Radio;
