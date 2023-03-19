import style from "./style.module.scss";
import { Props } from "./types";

const Slider: React.FC<Props> = ({
  questions,
  i,
  onChange,
  heading,
  percentage,
}) => {
  // Decrease function to decrement percentage value by 10%
  const decrease = () => {
    if (percentage > 0) {
      onChange({
        heading,
        percentage: percentage - 10,
      });
    }
  };

  // Increase function to increment percentage value by 10%
  const increase = () => {
    if (percentage < 100) {
      onChange({
        heading,
        percentage: percentage + 10,
      });
    }
  };

  // Rendering slider component with left and right arrows and a ball indicating the percentage
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        {i === 0 && <div className={style.top_line}></div>}
        <div className="d-flex justify-content-between align-items-center pt-2 pb-3 py-md-4 gap-3">
          <img
            className="pointer"
            onClick={() => decrease()}
            src="/assets/left.svg"
            alt=""
          />
          <div className={style.slider}>
            <div
              style={{ left: `${(percentage === 100 && 95) || percentage}%` }}
              className={style.ball}
            ></div>
          </div>
          <img
            className="pointer"
            onClick={() => increase()}
            src="/assets/right.svg"
            alt=""
          />
        </div>
      </div>
      {<div className={style.bottom_line}></div>}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default Slider;
