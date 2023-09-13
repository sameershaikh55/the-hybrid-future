import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import SliderPercentage from "@/components/SliderPercentage";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionTwo } from "@/store/actions/survey";
import { RootState, HandleChange } from "../../../../types/survey/profile_setup/question2";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ2 = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionTwo());

    const savedState = sessionStorage.getItem("questionTwoState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionTwo, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<HandleChange[]>([]);

  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem("questionTwoState", JSON.stringify(handleInput));
    }
  }, [handleInput]);

  const handleChange = (e: HandleChange) => {
    if (e.percentage === 0) {
      const handleInputZeroPercent = handleInput.filter(
        (content) => content.heading !== e.heading
      );
      setHandleInput(handleInputZeroPercent);
    } else {
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
    }
  };

  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionTwo).length && questionTwo["average-time"]) || [];

  const totalPercentage = handleInput.reduce(
    (sum, obj) => sum + obj.percentage,
    0
  );

  /* TODO: update the org name with actual org name across files */

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
                            type2
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
                            totalPercentage={totalPercentage}
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

          <div>
            <OptionsWrapper>
              <div className="col-9 col-md-10">
                <div className="row">
                  <div className={`col-12 col-md-5`}></div>
                  <div className={`col-12 col-md-7`}></div>
                </div>
              </div>
              <div className={`col-3 col-md-2`}>
                <SliderPercentage
                  total
                  i={question.length + 1}
                  questions={question.length && question.length + 2}
                  percentage={totalPercentage + "%" || "0%"}
                />
              </div>
            </OptionsWrapper>
          </div>
        </div>
        <SurveyActions
          chosenData={handleInput}
          backURL={onboarding.question1_2}
          nextURL={
            handleInput.some((content) => content.heading === "Home")
              ? onboarding.question3
              : (handleInput.some(
                  (content) =>
                    content.heading === "My organisation’s workplace(s)"
                ) &&
                  onboarding.question4_a) ||
                onboarding.question6
          }
          active={handleInput.length ? true : false}
        />
      </QuestionWrapper>
    </Layout>
  );
};

export default ProfileSetupQ2;
