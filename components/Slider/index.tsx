import style from "./style.module.scss";
import { Props } from "./types";

const Slider: React.FC<Props> = ({
  questions,
  i,
  onChange,
  heading,
  percentage,
  totalPercentage,
}) => {
  const decrease = () => {
    const newPercentage = Math.max(0, percentage - 10);
    onChange({ heading, percentage: newPercentage });
  };

  const increase = () => {
    const increment = Math.min(10, 100 - percentage, 100 - totalPercentage);
    onChange({ heading, percentage: percentage + increment });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    const newTotalPercentage = totalPercentage - percentage + value;
    if (newTotalPercentage <= 100) {
      onChange({ heading, percentage: value });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {i === 0 && <div className={style.top_line}></div>}
      <div className="d-flex justify-content-between align-items-center pt-2 pb-3 py-md-4 gap-3">
        <img
          className="pointer"
          onClick={decrease}
          src="/assets/left.svg"
          alt="Decrease percentage"
        />
        <div className={style.slider}>
          <input
            className="w-100"
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={handleChange}
          />
        </div>
        <img
          className="pointer"
          onClick={increase}
          src="/assets/right.svg"
          alt="Increase percentage"
        />
      </div>
      <div className={style.bottom_line}></div>
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default Slider;
