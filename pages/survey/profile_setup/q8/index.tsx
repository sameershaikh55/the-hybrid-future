import { useEffect, useState } from "react";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestion";
import SurveyCheckbox from "@/components/surveyCheckbox";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionSeven } from "@/redux/action/survey";
import { RootState, QuestionSevenOption } from "./types";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";

const Q8 = () => {
  // create a dispatcher
  const dispatch = useDispatch();

  // create a typed dispatcher with ThunkDispatch
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // load the data for the component
  useEffect(() => {
    dispatchTyped(getQuestionSeven());

    // check for saved state and restore it
    const savedState = sessionStorage.getItem("questionSevenState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // get the relevant state from the store and set initial input state
  const { questionSeven, loading } = useSelector(
    (state: RootState) => state.survey
  );
  const [handleInput, setHandleInput] = useState<QuestionSevenOption[]>([]);

  // save state to sessionStorage whenever input state changes
  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionSevenState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // update the input state based on user selections
  const handleChange = (e: QuestionSevenOption) => {
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

  // if data is still being loaded, display a loading spinner
  if (loading) {
    return <Loader />;
  }

  // get the options for this question from the store
  const question =
    (Object.keys(questionSeven).length &&
      questionSeven["activity-question-1"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q8">
      <QuestionWrapper
        questionNumber="8"
        question="Which of the following activities are important to your role at your organisation?"
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
          backURL="q7"
          nextURL="/survey/thank_you"
          active={handleInput.length ? true : false}
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default Q8;
