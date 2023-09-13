import { useEffect, useState } from "react";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import Radio from "@/components/Radio";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { Dispatch } from "redux";
import { getQuestionFive } from "@/store/actions/survey";
import { HandleChange, RootState } from "./types";
import Loader from "@/components/Loader";
import { HandleChange as questionTwoStateType } from "../question2/types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ5 = () => {
  const dispatch = useDispatch();
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    // if home > 100
    let questionTwoState: string | questionTwoStateType[] | boolean | any =
      sessionStorage.getItem("questionTwoState");
    questionTwoState = JSON.parse(questionTwoState);
    let filteredQuestionTwoState = questionTwoState.some(
      (content: any) => content.heading === "Home"
    );

    setIsHome(filteredQuestionTwoState);
  }, []);

  useEffect(() => {
    dispatchTyped(getQuestionFive());

    const savedState = sessionStorage.getItem("questionFiveAState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionFive, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });
  const [isHome, setIsHome] = useState<boolean>();

  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionFiveAState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  if (loading) {
    return <Loader />;
  }

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
          chosenData={handleInput}
          backURL={onboarding.question4_b}
          nextURL={(isHome && onboarding.question7) || onboarding.question6}
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

export default ProfileSetupQ5;
