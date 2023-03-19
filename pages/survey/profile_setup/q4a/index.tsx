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

const Q4a = () => {
  // Get dispatch function from redux store
  const dispatch = useDispatch();

  // Define dispatchTyped to specify dispatch's type
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // On component mount, dispatch getQuestionFour action and load saved state from session storage
  useEffect(() => {
    dispatchTyped(getQuestionFour());

    const savedState = sessionStorage.getItem("questionFourAState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Get questionFour and loading from survey state using useSelector hook
  const { questionFour, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // Define state for handle input using useState hook
  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });

  // On change in handleInput state, save state to session storage
  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionFourAState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // Define function to handle change in handleInput state
  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  // If loading is true, display loader
  if (loading) {
    return <Loader />;
  }

  // Get question options from questionFour
  const question =
    (Object.keys(questionFour).length &&
      questionFour["office-work-setting"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q4a">
      <QuestionWrapper
        questionNumber="4/a"
        question={
          <div>
            <h1 className="f32 fw600 mb-5">
              Think about the type of work setting you use most often in a
              workplace.
            </h1>
            <h1 className="f32 fw600">
              (a) Is it permanently assigned to you?
            </h1>
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
          backURL="q3"
          nextURL="q4b"
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

export default Q4a;
