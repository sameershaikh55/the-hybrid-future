// This component is used to render password validation requirements.
// The 'requirements' array contains an object for each password requirement, with its 'id' and corresponding error message.
// The 'passValidation' prop is an array of validated requirement ids. It will be checked against each requirement's 'id' to show validation results.
// The component renders each requirement as a list item with a validation icon indicating whether it is validated or not.
// A 'true' validation result shows a tick icon, and a 'false' result shows a red cross icon.

import style from "./style.module.scss";
import { Props } from "./types";

const PasswordValidation: React.FC<Props> = ({ passValidation }) => {
  const requirements = [
    { id: 1, error: "At least 8 characters" },
    { id: 2, error: "A number" },
    { id: 3, error: "An uppercase letter" },
    { id: 4, error: "A lowercase letter" },
    { id: 5, error: "A symbol" },
  ];

  // Renders the password requirements with corresponding validation icon
  return (
    <div className={style.password_validation}>
      <h6 className="fw-bolder">Your password must have:</h6>

      <div className="mt-2">
        {requirements.map((content, i) => {
          // Check if the requirement's 'id' is validated by the 'passValidation' prop
          const isValidated = passValidation?.includes(content.id);
          // Renders each requirement with corresponding validation icon based on its validation result
          return (
            <div key={i} className="d-flex align-items-center gap-2 mt-1">
              {(isValidated && <img src="/assets/valcross.svg" alt="" />) || (
                <img src="/assets/valcorrect.svg" alt="" />
              )}
              <p
                // Adds opacity class based on validation result
                className={`f15 fw500 mb-0 ${
                  (isValidated && "opacity-50") || "opacity-100"
                }`}
              >
                {content.error}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordValidation;
