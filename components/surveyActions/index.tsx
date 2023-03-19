import Link from "next/link";
import { useEffect } from "react";
import style from "./style.module.scss";
import { Props, SessionStorageData } from "./type";

// This component renders the back and next buttons for a survey form.
// It receives `backURL`, `nextURL`, and `active` props to determine the URLs of the previous and next pages,
// and whether the next button should be active or disabled.
const SurveyActions: React.FC<Props> = ({ backURL, nextURL, active }) => {
  // This effect retrieves the data from the session storage and logs it to the console.
  useEffect(() => {
    let data: SessionStorageData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i) as string;
      const value = sessionStorage.getItem(key) as string;
      data[key] = JSON.parse(value);
    }

    console.log(data);
  }, []);

  return (
    <div className={`${style.actions_container} d-flex gap-3`}>
      <Link href={backURL}>
        <button>Back</button>
      </Link>
      {(active && (
        <Link href={nextURL}>
          <button>Next</button>
        </Link>
      )) || <button disabled>Next</button>}{" "}
      {/* disable the next button if it's not active */}
    </div>
  );
};

export default SurveyActions;
