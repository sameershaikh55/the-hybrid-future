import { useEffect, useState } from "react";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import SurveyCheckbox from "@/components/SurveyCheckbox";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionSix } from "@/store/actions/survey";
import { RootState, QuestionSixOption } from "../../../../types/survey/profile_setup/question7";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ7 = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionSix());

    const savedState = sessionStorage.getItem("questionSixState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionSix, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<QuestionSixOption[]>([]);

  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionSixState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: QuestionSixOption) => {
    const specialLabel = "No one";
    const isPresent = handleInput?.some((obj) => obj.option_id === e.option_id);

    if (isPresent) {
      const removed = handleInput?.filter(
        (content) => content.option_id !== e.option_id
      );

      setHandleInput(removed);
    } else {
      if (e.option_label === specialLabel) {
        setHandleInput([{ ...e }]);
      } else {
        const isNoOnePresent = handleInput?.filter(
          (obj) => obj.option_label !== specialLabel
        );

        setHandleInput([...isNoOnePresent, { ...e }]);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionSix).length &&
      questionSix["presence-of-others"][0].options) ||
    [];

  return (
    <Layout title="Demonstration Survey Q7">
      <QuestionWrapper
        questionNumber="7"
        question={
          <div>
            <h1 className="f32 fw600">
              When you work from home, who is typically present?
            </h1>
            <h1 className="f32 fw600">Select all that apply or ‘no one’.</h1>
          </div>
        }
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
          backURL={onboarding.question6}
          nextURL={onboarding.question8}
          active={handleInput.length ? true : false}
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default ProfileSetupQ7;
