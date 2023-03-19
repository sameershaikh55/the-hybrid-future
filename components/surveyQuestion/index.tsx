import style from "./style.module.scss";
import { Props } from "./types";

// Creating another functional component named SurveyQuestion that receives props
const SurveyQuestion: React.FC<Props> = ({
  questions,
  question,
  i,
  time,
  active,
}) => {
  return (
    // Wrapping the component in a div with flexbox styling for alignment and height control
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        {/* Rendering a top line with custom style if it's the first question */}
        {i === 0 && <div className={style.top_line}></div>}

        {/* Adding the question title with custom style and changing font color based on props */}
        <h5
          className={`mb-0 fw600 py-4 f18 ${(time && "color4") || ""} ${
            (active && "color6") || "color4"
          }`}
        >
          {question}
        </h5>
      </div>

      {/* Rendering a bottom line with custom style if it's not the last question */}
      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {/* Rendering a different bottom line with custom style if it's the last question */}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

// Exporting the SurveyQuestion component as default
export default SurveyQuestion;
