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
import { HandleChange, RootState } from "../../../../types/survey/profile_setup/question6";
import { HandleChange as questionTwoStateType } from "../../../../types/survey/profile_setup/question2";
import Loader from "@/components/Loader";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ6 = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionFive());

    const savedState = sessionStorage.getItem("questionFiveBState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    let questionTwoState: string | questionTwoStateType[] | boolean | any =
      sessionStorage.getItem("questionTwoState");
    questionTwoState = JSON.parse(questionTwoState);
    let filteredQuestionTwoState = questionTwoState.some(
      (content: any) => content.heading === "Home"
    );

    setIsHome(filteredQuestionTwoState);
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
      sessionStorage.setItem("questionFiveBState", JSON.stringify(handleInput));
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
          chosenData={handleInput}
          backURL={onboarding.question5}
          nextURL={(isHome && onboarding.question7) || onboarding.question8}
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

export default ProfileSetupQ6;
