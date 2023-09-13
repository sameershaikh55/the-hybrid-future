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
import { getQuestionFour } from "@/store/actions/survey";
import { HandleChange, RootState } from "../../../../types/survey/profile_setup/question4_a";
import Loader from "@/components/Loader";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ4A = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionFour());

    const savedState = sessionStorage.getItem("questionFourAState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionFour, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<HandleChange>({
    selectedOption: {
      option_id: 0,
    },
  });

  useEffect(() => {
    if (
      Object.keys(handleInput.selectedOption).length &&
      handleInput.selectedOption.option_id !== 0
    ) {
      sessionStorage.setItem("questionFourAState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: HandleChange) => {
    setHandleInput({ ...e });
  };

  if (loading) {
    return <Loader />;
  }

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
          chosenData={handleInput}
          backURL={onboarding.question3}
          nextURL={onboarding.question4_b}
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

export default ProfileSetupQ4A;
