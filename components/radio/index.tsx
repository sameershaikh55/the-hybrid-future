import style from "./style.module.scss";
import { Props } from "./types";

// Define Radio component
const Radio: React.FC<Props> = ({ questions, i, onChange, active, option }) => {
  // Render the component
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {/* Add top line if first item */}
      {i === 0 && <div className={style.top_line}></div>}

      {/* Add radio button */}
      <div className="h-100 d-flex flex-column justify-content-center">
        <div
          style={{ height: "68px" }}
          className="f32 text-center fw700 color6 mb-0 d-flex justify-content-center align-items-center"
        >
          <input
            type="radio"
            checked={active}
            className={style.radio}
            onChange={() => onChange({ selectedOption: option })}
          />
        </div>
      </div>

      {/* Add bottom line if not last item */}
      {i + 1 !== questions && <div className={style.bottom_line}></div>}

      {/* Add different bottom line style for last item */}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default Radio;
