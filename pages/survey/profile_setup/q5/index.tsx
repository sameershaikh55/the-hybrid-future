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
import { getQuestionFive } from "@/redux/action/survey";
import { HandleChange, RootState } from "./types";
import Loader from "@/components/Loader";

const Q5 = () => {
  // Get the dispatch function and cast it to the appropriate type
  const dispatch = useDispatch();
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // Use useEffect to dispatch an action when the component mounts
  // Also retrieve data from sessionStorage if available and set the input state
  useEffect(() => {
    dispatchTyped(getQuestionFive());

    const savedState = sessionStorage.getItem("questionFiveAState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Get questionFive and loading state from the store using useSelector
  const { questionFive, loading } = useSelector(
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
      sessionStorage.setItem("questionFiveAState", JSON.stringify(handleInput));
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

  // Get the options for questionFive["home-work-setting"][0] or set to an empty array
  const question =
    (Object.keys(questionFive).length &&
      questionFive["home-work-setting"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q5">
      <QuestionWrapper
        questionNumber="5"
        question="What type of work setting do you typically use when working from home?"
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
          backURL="q4b"
          nextURL="q6"
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

export default Q5;
