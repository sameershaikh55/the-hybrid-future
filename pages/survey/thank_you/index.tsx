import style from "./style.module.scss";
import Layout from "@/components/Layout/MainLayout";
import Link from "next/link";

export default function ThankYou() {
  return (
    <Layout title="Thank you">
      <img
        className={`${style.welcomeBg}`}
        src="/assets/thankyouBG.svg"
        alt=""
      />
      <div className={`${style["thank_you_container"]}`}>
        <div>
          <h1 className={`f88 text-white`}>
            <span className="color1">Thank you</span>
            <br />
            your profile is <br className="d-none d-sm-block" /> now complete
          </h1>

          <p className={`${style.subtitle} text-white`}>
            Your details have been saved. <br className="d-none d-sm-block" />{" "}
            Continue to the 90 second pulse survey.
          </p>

          <Link href="/login">
            <button onClick={() => sessionStorage.clear()}>Continue</button>
          </Link>
        </div>
      </div>
      <div className={`${style.tagline} w-100 pb-4`}>
        <div
          className={`d-flex flex-row justify-content-between align-items-end w-100 gap-5`}
        >
          <img className={style.logo} src="/assets/lessmanLogo.svg" alt="" />
          <img className={style.logo} src="/assets/realEstate.svg" alt="" />
        </div>
      </div>
    </Layout>
  );
}
