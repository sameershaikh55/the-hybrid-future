import { useEffect, useState } from "react";
import QuestionOptions from "@/components/questionOptions";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestionTwo";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionOne } from "@/redux/action/survey";
import { RootState, HandleChange } from "./types";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";

const Q1 = () => {
  // Initializing and setting the useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Setting the type of dispatchTyped as ThunkDispatch from the redux-thunk library
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // Using the useEffect hook to fetch question one data and handle saved state from sessionStorage
  useEffect(() => {
    dispatchTyped(getQuestionOne());

    const savedState = sessionStorage.getItem("questionOneState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Getting the data and loading status from the Redux store
  const { questionOne, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // Initializing and setting the useState hook to handle user input
  const [handleInput, setHandleInput] = useState<HandleChange[]>([]);

  // Using the useEffect hook to handle saved state from sessionStorage
  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionOneState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  // Creating a function to handle user input changes
  const handleChange = (e: HandleChange) => {
    const isPresent = handleInput?.filter(
      (content) => content.heading === e.heading
    );

    if (isPresent.length) {
      const isPresent = handleInput?.map((content) =>
        content.heading === e.heading ? e : content
      );

      setHandleInput(isPresent);
    } else {
      setHandleInput([...handleInput, { ...e }]);
    }
  };

  // If loading is true, render the Loader component
  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionOne).length && questionOne["demographics-thf"]) || [];

  return (
    <Layout title="Demonstration Survey Q1">
      <QuestionWrapper
        questionNumber="1"
        question="Please tell us about yourself."
      >
        <div className="row">
          {(question.length &&
            question.map((content, i) => {
              const { heading, options } = content;
              const formLength = question.length;

              return (
                <div key={i}>
                  <OptionsWrapper>
                    <div className={`col-12 col-md-8`}>
                      <SurveyQuestion
                        question={heading}
                        questions={formLength}
                        i={i}
                      />
                    </div>
                    <div className={`col-12 col-md-4`}>
                      <QuestionOptions
                        values={handleInput}
                        options={options}
                        onChange={handleChange}
                        questions={formLength}
                        heading={heading}
                        i={i}
                      />
                    </div>
                  </OptionsWrapper>
                </div>
              );
            })) || <div className="text-center py-4">no data found</div>}
        </div>

        <SurveyActions
          backURL="/survey/start"
          nextURL="q2"
          active={
            question.length &&
            Object.keys(handleInput).length === question.length
              ? true
              : false
          }
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default Q1;
