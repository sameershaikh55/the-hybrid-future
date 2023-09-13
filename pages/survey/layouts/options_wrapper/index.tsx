import QuestionHead from "@/components/QuestionHead";
import style from "./style.module.scss";
import { Props } from "../../../../types/survey/layouts/options_wrapper";

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
