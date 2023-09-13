import { useEffect, useState } from "react";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import SurveyCheckbox from "@/components/SurveyCheckbox";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionSeven } from "@/store/actions/survey";
import { RootState, QuestionSevenOption } from "../../../../types/survey/profile_setup/question8";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ8 = () => {
  const dispatch = useDispatch();
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionSeven());

    const savedState = sessionStorage.getItem("questionSevenState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionSeven, loading } = useSelector(
    (state: RootState) => state.survey
  );
  const [handleInput, setHandleInput] = useState<QuestionSevenOption[]>([]);

  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionSevenState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: QuestionSevenOption) => {
    const isPresent = handleInput?.some((obj) => obj.option_id === e.option_id);

    if (isPresent) {
      const removed = handleInput?.filter(
        (content) => content.option_id !== e.option_id
      );
      setHandleInput(removed);
    } else {
      setHandleInput([...handleInput, { ...e }]);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionSeven).length &&
      questionSeven["activity-question-1"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q8">
      <QuestionWrapper
        questionNumber="8"
        question="Which of the following activities are important to your role at your organisation?"
      >
        <div className="row">
          {(question.length &&
            question.map((content, i) => {
              const { option_label, option_id } = content;
              const formLength = question.length;
              const isTrue = handleInput?.some(
                (obj) => obj.option_id === option_id
              );

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
                      <SurveyCheckbox
                        value={isTrue}
                        handleChange={handleChange}
                        i={i}
                        questions={formLength}
                        option={content}
                      />
                    </div>
                  </OptionsWrapper>
                </div>
              );
            })) || <div className="text-center py-4">no data found</div>}
        </div>

        <SurveyActions
          chosenData={handleInput}
          backURL={onboarding.question7}
          nextURL="/survey/thank_you"
          active={handleInput.length ? true : false}
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default ProfileSetupQ8;
