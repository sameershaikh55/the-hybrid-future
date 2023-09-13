import style from "./style.module.scss";
import { Props } from "./types";

const SliderPercentage: React.FC<Props> = ({
  questions,
  i,
  percentage,
  total,
}) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {i === 0 && <div className={style.top_line}></div>}
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1
          style={{ padding: "18px 0px" }}
          className={`f32 text-center fw700 mb-0 ${style.title} ${
            total ? "color5" : "color6"
          }`}
        >
          {percentage}
        </h1>
      </div>
      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default SliderPercentage;
