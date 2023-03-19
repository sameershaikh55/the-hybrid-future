import { useEffect, useState } from "react";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestion";
import SurveyCheckbox from "@/components/surveyCheckbox";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionSix } from "@/redux/action/survey";
import { RootState, QuestionSixOption } from "./types";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";

const Q7 = () => {
  // initialize useDispatch hook
  const dispatch = useDispatch();

  // define dispatchTyped variable with correct type annotation
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // fetch questionSix from API and load saved state (if available) on component mount
  useEffect(() => {
    dispatchTyped(getQuestionSix());

    const savedState = sessionStorage.getItem("questionSixState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // get questionSix and loading state from Redux store
  const { questionSix, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // initialize handleInput state
  const [handleInput, setHandleInput] = useState<QuestionSixOption[]>([]);

  // save handleInput state to session storage on change
  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionSixState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // update handleInput state based on user input
  const handleChange = (e: QuestionSixOption) => {
    const isPresent = handleInput?.some((obj) => obj.option_id === e.option_id);

    if (isPresent) {
      const removed = handleInput?.filter(
        (content) => content.option_id !== e.option_id
      );

      setHandleInput(removed);
    } else {
      setHandleInput([...handleInput, { ...e }]);
    }
  };

  // if loading, render loader component
  if (loading) {
    return <Loader />;
  }

  // extract questionSix options array
  const question =
    (Object.keys(questionSix).length &&
      questionSix["presence-of-others"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q7">
      <QuestionWrapper
        questionNumber="7"
        question={
          <div>
            <h1 className="f32 fw600">
              When you work from home, who is typically present?
            </h1>
            <h1 className="f32 fw600">Select all that apply or ‘no one’.</h1>
          </div>
        }
      >
        <div className="row">
          {(question.length &&
            question.map((content, i) => {
              const { option_label, option_id } = content;
              const formLength = question.length;
              const isTrue = handleInput?.some(
                (obj) => obj.option_id === option_id
              );

              return (
                <div key={i}>
                  <OptionsWrapper>
                    <div className={`col-9 col-md-10`}>
                      <SurveyQuestion
                        time
                        question={option_label}
                        questions={formLength}
                        i={i}
                        active={isTrue}
                      />
                    </div>
                    <div className={`col-3 col-md-2`}>
                      <SurveyCheckbox
                        value={isTrue}
                        handleChange={handleChange}
                        i={i}
                        questions={formLength}
                        option={content}
                      />
                    </div>
                  </OptionsWrapper>
                </div>
              );
            })) || <div className="text-center py-4">no data found</div>}
        </div>

        <SurveyActions
          backURL="q6"
          nextURL="q8"
          active={handleInput.length ? true : false}
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default Q7;
