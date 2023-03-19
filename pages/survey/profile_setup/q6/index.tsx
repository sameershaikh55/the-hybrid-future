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

const Q6 = () => {
  // Initialize a dispatch function
  const dispatch = useDispatch();

  // Typecast the dispatch function to specify the type of actions it can dispatch
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // Fetch the question and answer options from the Redux store when the component mounts
  useEffect(() => {
    dispatchTyped(getQuestionFive());

    // Load the user's previously saved answer from session storage, if available
    const savedState = sessionStorage.getItem("questionFiveBState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Retrieve the question and loading status from the Redux store
  const { questionFive, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // Initialize the user's input state and default answer option
  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });

  // Save the user's answer to session storage whenever the user's input state changes
  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionFiveBState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // Handle the user's input changes
  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  // Show a loading spinner if the question is still being fetched
  if (loading) {
    return <Loader />;
  }

  // Retrieve the answer options for this question from the Redux store
  const question =
    (Object.keys(questionFive).length &&
      questionFive["home-work-setting"][1].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q6">
      <QuestionWrapper
        questionNumber="6"
        question="If you were to work from home, what type of work setting would you typically use?"
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
          backURL="q5"
          nextURL="q7"
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

export default Q6;
