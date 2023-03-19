import { Props } from "./type";
import style from "./style.module.scss";

const QuestionHead: React.FC<Props> = ({ questionNumber, question }) => {
  return (
    <div className={style.question_head}>
      <p className="fw600 mb-4">Question {questionNumber}</p>
      <div className="f32 fw600">{question}</div>
    </div>
  );
};

export default QuestionHead;
