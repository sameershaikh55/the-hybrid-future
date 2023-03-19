import { useEffect, useState } from "react";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestion";
import Radio from "@/components/radio";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";
import { Dispatch } from "redux";
import { getQuestionFour } from "@/redux/action/survey";
import { HandleChange, RootState } from "./types";
import Loader from "@/components/Loader";

const Q4b = () => {
  // Get the dispatch function and cast it to the appropriate type
  const dispatch = useDispatch();
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // Use useEffect to dispatch an action when the component mounts
  // Also retrieve data from sessionStorage if available and set the input state
  useEffect(() => {
    dispatchTyped(getQuestionFour());

    const savedState = sessionStorage.getItem("questionFourBState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Get questionFour and loading state from the store using useSelector
  const { questionFour, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // Set the initial state for handleInput using useState
  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });

  // Use useEffect to update sessionStorage whenever handleInput changes
  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionFourBState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // Define a handleChange function to update the handleInput state
  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  // If loading is true, return a Loader component
  if (loading) {
    return <Loader />;
  }

  // Get the options for questionFour["office-work-setting"][1] or set to an empty array
  const question =
    (Object.keys(questionFour).length &&
      questionFour["office-work-setting"][1].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q4b">
      <QuestionWrapper
        questionNumber="4/b"
        question={
          <div>
            <h1 className="f32 fw600 mb-5">
              Think about the type of work setting you use most often in a
              workplace.
            </h1>
            <h1 className="f32 fw600">(b) What type of setting is it?</h1>
          </div>
        }
      >
        <div className="row">
          {(question.length &&
            question.map((content, i) => {
              const { option_label, option_id } = content;
              const formLength = question.length;
              const isTrue =
                (Object.keys(handleInput.selectedOption).length &&
                  handleInput.selectedOption.option_id === option_id) ||
                false;

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
                      <Radio
                        i={i}
                        questions={formLength}
                        onChange={handleChange}
                        option={content}
                        active={isTrue}
                      />
                    </div>
                  </OptionsWrapper>
                </div>
              );
            })) || <div className="text-center py-4">no data found</div>}
        </div>

        <SurveyActions
          backURL="q4a"
          nextURL="q5"
          active={
            Object.keys(handleInput.selectedOption).length &&
            handleInput.selectedOption.option_id !== 0
              ? true
              : false
          }
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default Q4b;
