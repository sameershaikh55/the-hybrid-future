import { useEffect, useState } from "react";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestion";
import Radio from "@/components/radio";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { getQuestionThree } from "@/redux/action/survey";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";
import { HandleChange, RootState } from "./types";

const Q3 = () => {
  const dispatch = useDispatch(); // using the useDispatch hook to get access to the dispatch function

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>; // creating a typed dispatch that can handle both async and sync actions

  useEffect(() => {
    // useEffect hook to fetch data from server and initialize state
    dispatchTyped(getQuestionThree()); // fetch the question three data from the server

    const savedState = sessionStorage.getItem("questionThreeState"); // get the saved state from the sessionStorage
    if (savedState) {
      // if the saved state exists, set it as the initial state
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionThree, loading } = useSelector(
    (state: RootState) => state.survey
  ); // using the useSelector hook to get access to the state stored in the Redux store

  const [handleInput, setHandleInput] = useState<HandleChange>({
    // initializing state using the useState hook
    selectedOption: {
      option_id: 0,
    },
  });

  useEffect(() => {
    // useEffect hook to save state in the sessionStorage
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      // check if the user has selected an option and save the state in sessionStorage
      sessionStorage.setItem("questionThreeState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: HandleChange) => {
    // function to handle change in input
    setHandleInput({ ...e });
  };

  if (loading) {
    // if the data is still being loaded, display the loader
    return <Loader />;
  }

  const question =
    (Object.keys(questionThree).length &&
      questionThree["distance"][0]["options"]) ||
    []; // extract options for question three from the Redux store

  return (
    <Layout title="Demonstration Survey Q3">
      <QuestionWrapper
        questionNumber="3"
        question="On days that you are not working from home, how long does it typically take to travel to your chosen workplace?"
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
          backURL="q2"
          nextURL="q4a"
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

export default Q3;
