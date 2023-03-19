import style from "./style.module.scss";
import { Props } from "./types";

// This component renders a progress bar for a survey question.
// It receives `questions`, `i`, and `percentage` props to calculate the percentage of completion
// and show the appropriate lines at the top and bottom of the progress bar.
const SliderPercentage: React.FC<Props> = ({ questions, i, percentage }) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      {i === 0 && <div className={style.top_line}></div>}{" "}
      {/* show top line only for the first question */}
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1
          style={{ padding: "18px 0px" }}
          className={`f32 text-center fw700 color6 mb-0 ${style.title}`}
        >
          {percentage} {/* display the percentage of completion */}
        </h1>
      </div>
      {i + 1 !== questions && <div className={style.bottom_line}></div>}{" "}
      {/* show bottom line for all questions except the last one */}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}{" "}
      {/* show different bottom line for the last question */}
    </div>
  );
};

export default SliderPercentage;
