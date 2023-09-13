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

  return (
    <div className={style.password_validation}>
      <h6 className="fw-bolder">Your password must have:</h6>
      <div className="mt-2">
        {requirements.map(({ id, error }, i) => {
          const isValidated = passValidation?.includes(id);
          return (
            <div key={i} className="d-flex align-items-center gap-2 mt-1">
            <img
              src={isValidated ? "/assets/valcross.svg" : "/assets/valcorrect.svg"}
              alt={`Validation icon for ${isValidated ? "invalid" : "valid"} requirement`}
            />
            <p className={`f15 fw500 mb-0 ${isValidated ? "opacity-50" : "opacity-100"}`}>
              {error}
            </p>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordValidation;
