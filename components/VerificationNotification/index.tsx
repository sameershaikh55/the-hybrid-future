import style from "./style.module.scss";

const VerificationNotification: React.FC = () => {
  return (
    <div
      className={`${style.verificationNotification} d-flex flex-column justify-content-center align-items-center p-3 rounded-1`}
    >
      <img src="/assets/bell.svg" alt="" />
      <h1 className="f24 mb-0 mt-1 fw600">Verify your email</h1>
      <p className="f14 mt-1 text-center mb-0 px-md-3 fw500">
        Please check your email (and spam) for a link to verify your email
        address.
      </p>
    </div>
  );
};

export default VerificationNotification;
