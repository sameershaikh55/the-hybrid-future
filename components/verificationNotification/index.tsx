import style from "./style.module.scss";

// This component renders a verification notification with an image and a message
const VerificationNotification: React.FC = () => {
  return (
    <div
      className={`${style.verificationNotification} d-flex flex-column justify-content-center align-items-center p-3 rounded-1`}
    >
      <div className="mb-3">
        <img src="/assets/bell.svg" alt="" />
      </div>
      <p className="f16 text-center mb-0 px-md-3 fw500">
        Please click on the verification link sent to your email to finish
        setting up your account.
      </p>
    </div>
  );
};

export default VerificationNotification;
