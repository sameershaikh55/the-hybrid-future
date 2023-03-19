import style from "./style.module.scss";
import { Props } from "./types";

const SurveyQuestion: React.FC<Props> = ({ questions, question, i, time }) => {
  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        {i === 0 && <div className={style.top_line}></div>}

        <h5
          className={`mb-0 fw600 py-2 py-md-4 f18 ${style.title} ${
            (time && "color4") || ""
          }`}
        >
          {question}
        </h5>
      </div>
      {i + 1 !== questions && <div className={style.bottom_line}></div>}
      {i + 1 === questions && <div className={style.bottom_line_d}></div>}
    </div>
  );
};

export default SurveyQuestion;
