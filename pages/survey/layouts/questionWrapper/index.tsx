import QuestionHead from "@/components/questionHead";
import style from "./style.module.scss";
import { Props } from "./types";

const OptionsWrapper: React.FC<Props> = ({
  children,
  questionNumber,
  question,
}) => {
  return (
    <div className={`${style["survey_container"]} mx-auto`}>
      <QuestionHead questionNumber={questionNumber} question={question} />

      {children}
    </div>
  );
};

export default OptionsWrapper;
