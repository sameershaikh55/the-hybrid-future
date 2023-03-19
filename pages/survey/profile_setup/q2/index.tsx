import { useEffect, useState } from "react";
import Slider from "@/components/slider";
import SliderPercentage from "@/components/sliderPercentage";
import SurveyActions from "@/components/surveyActions";
import Layout from "@/layout";
import SurveyQuestion from "@/components/surveyQuestionTwo";
import QuestionWrapper from "../../layouts/questionWrapper";
import OptionsWrapper from "../../layouts/optionsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionTwo } from "@/redux/action/survey";
import { RootState, HandleChange } from "./types";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/redux/reducer/survey/types";

const Q2 = () => {
  // Initializing and setting the useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Setting the type of dispatchTyped as ThunkDispatch from the redux-thunk library
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  // Using the useEffect hook to fetch question one data and handle saved state from sessionStorage
  useEffect(() => {
    dispatchTyped(getQuestionTwo());

    const savedState = sessionStorage.getItem("questionTwoState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  // Getting the data and loading status from the Redux store
  const { questionTwo, loading } = useSelector(
    (state: RootState) => state.survey
  );

  // Initializing and setting the useState hook to handle user input
  const [handleInput, setHandleInput] = useState<HandleChange[]>([]);

  // Using the useEffect hook to handle saved state from sessionStorage
  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionTwoState", JSON.stringify(handleInput));
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
    (Object.keys(questionTwo).length && questionTwo["average-time"]) || [];

  return (
    <Layout title="Demonstration Survey Q2">
      <QuestionWrapper
        questionNumber="2"
        question="On average, what proportion of your work time at your organisation (Organisation X) do you spend at the following locations? Drag the sliders to total 100%."
      >
        <div className="row">
          {(question.length &&
            question.map((content, i) => {
              const { heading } = content;
              const formLength = question.length;
              const isPresent = handleInput?.filter(
                (content) => content.heading === heading
              );

              return (
                <div key={i}>
                  <OptionsWrapper>
                    <div className="col-9 col-md-10">
                      <div className="row">
                        <div className={`col-12 col-md-5`}>
                          <SurveyQuestion
                            question={heading}
                            questions={formLength}
                            i={i}
                          />
                        </div>
                        <div className={`col-12 col-md-7`}>
                          <Slider
                            questions={formLength}
                            i={i}
                            onChange={handleChange}
                            heading={heading}
                            percentage={
                              (isPresent.length && isPresent[0].percentage) || 0
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`col-3 col-md-2`}>
                      <SliderPercentage
                        i={i}
                        questions={formLength}
                        percentage={
                          (isPresent.length && isPresent[0].percentage + "%") ||
                          "0%"
                        }
                      />
                    </div>
                  </OptionsWrapper>
                </div>
              );
            })) || <div className="text-center py-4">no data found</div>}
        </div>
        <SurveyActions
          backURL="q1"
          nextURL="q3"
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

export default Q2;
