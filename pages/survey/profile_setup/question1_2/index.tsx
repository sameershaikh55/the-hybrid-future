import { useEffect, useState } from "react";
import QuestionOptions from "@/components/QuestionOptions";
import SurveyActions from "@/components/SurveyActions";
import Layout from "@/components/Layout/MainLayout";
import SurveyQuestion from "@/components/SurveyQuestion";
import QuestionWrapper from "../../layouts/options_wrapper";
import OptionsWrapper from "../../layouts/single_options_wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionOnePointTwo } from "@/store/actions/survey";
import { RootState, HandleChange } from "./types";
import Loader from "@/components/Loader";
import { ThunkDispatch } from "redux-thunk";
import { Dispatch } from "redux";
import { SurveyAction, SurveyState } from "@/store/reducers/survey/types";
import { onboarding } from "@/constants/routes";

const ProfileSetupQ1_2 = () => {
  const dispatch = useDispatch();

  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as Dispatch<SurveyAction>;

  useEffect(() => {
    dispatchTyped(getQuestionOnePointTwo());

    const savedState = sessionStorage.getItem("questionOnePointTwoState");
    if (savedState) {
      setHandleInput(JSON.parse(savedState));
    }
  }, []);

  const { questionOnePointTwo, loading } = useSelector(
    (state: RootState) => state.survey
  );

  const [handleInput, setHandleInput] = useState<HandleChange[]>([]);

  useEffect(() => {
    if (handleInput.length) {
      sessionStorage.setItem(
        "questionOnePointTwoState",
        JSON.stringify(handleInput)
      );
    }
  }, [handleInput]);

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

  if (loading) {
    return <Loader />;
  }

  const question =
    (Object.keys(questionOnePointTwo).length &&
      questionOnePointTwo["demographics-thf"]) ||
    [];

  return (
    <Layout title="Demonstration Survey Q1.2">
      <QuestionWrapper
        questionNumber="1.2"
        question="Tell us about yourself (cont’d)."
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
                        type2
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
          chosenData={handleInput}
          backURL={onboarding.question1_2}
          nextURL={onboarding.question2}
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

export default ProfileSetupQ1_2;
