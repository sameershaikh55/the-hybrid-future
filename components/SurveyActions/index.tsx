import Link from "next/link";
import { useEffect } from "react";
import style from "./style.module.scss";
import { Props, SessionStorageData } from "./types";
import { useRouter } from "next/router";
import { sendChosenData } from "@/store/actions/survey";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { SurveyAction, SurveyState } from "@/store/reducers/auth/types";

// SurveyActions component renders the back and next buttons for a survey form.
const SurveyActions: React.FC<Props> = ({
  backURL,
  nextURL,
  active,
  chosenData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const questionName = pathname.split("/").pop();

  // create a typed dispatcher with ThunkDispatch
  const dispatchTyped: ThunkDispatch<SurveyState, null, SurveyAction> =
    dispatch as ThunkDispatch<SurveyState, null, SurveyAction>;

  useEffect(() => {
    let data: SessionStorageData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i) as string;
      const value = sessionStorage.getItem(key) as string;
      data[key] = JSON.parse(value);
    }
  }, []);

  const sendingData = {
    question: questionName,
    chosenAnswer: chosenData,
  };

  return (
    <div className={`${style.actions_container} d-flex gap-3`}>
      <div onClick={() => router.back()}>
        <button>Back</button>
      </div>
      {active ? (
        <Link href={nextURL} onClick={() => dispatchTyped(sendChosenData(sendingData))}>
          <button>Next</button>
        </Link>
      ) : (
        <button disabled>Next</button>
      )}
    </div>
  );
};

export default SurveyActions;
