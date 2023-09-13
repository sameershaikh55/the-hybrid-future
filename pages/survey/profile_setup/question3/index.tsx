import { useEffect, useState } from "react";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import Radio from "@/components/Radio";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { getQuestionThree } from "@/store/actions/survey";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { HandleChange, RootState } from "./types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ3 = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    // If home > 100
    let questionTwoState: string | boolean | any =
      sessionStorage.getItem("questionTwoState");
    questionTwoState = JSON.parse(questionTwoState);
    let filteredQuestionTwoState = questionTwoState.some(
      (content: any) => content.heading === "My organisation’s workplace(s)"
    );
    let filteredQuestionTwoStateHome = questionTwoState.some(
      (content: any) => content.heading === "Home"
    );

    setIsWorkplace(filteredQuestionTwoState);
    setIsHone(filteredQuestionTwoStateHome);
  }, []);

  useEffect(() => {
    dispatchTyped(getQuestionThree());

    const savedState = sessionStorage.getItem("questionThreeState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionThree, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });
  const [isWorkplace, setIsWorkplace] = useState<boolean>();
  const [isHone, setIsHone] = useState<boolean>();

  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionThreeState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionThree).length &&
      questionThree["distance"][0]["options"]) ||
    [];

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
          chosenData={handleInput}
          backURL={onboarding.question2}
          nextURL={
            isWorkplace
              ? onboarding.question4_a
              : (isHone && onboarding.question5) || onboarding.question6
          }
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

export default ProfileSetupQ3;
