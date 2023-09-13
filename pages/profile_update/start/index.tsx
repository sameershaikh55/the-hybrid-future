import style from "./style.module.scss";
import Layout from "@/components/Layout/MainLayout";
import Link from "next/link";

export default function Start() {
  return (
    <Layout title="Start Survey">
      <div className={`${style["start_survey_container"]}`}>
        <div>
          <h1
            className={`fw300 f92 d-none d-md-block ${style.title} text-white`}
          >
            <span>About you ―</span> <br className="d-none d-sm-block" /> time
            to update <br className="d-none d-sm-block" /> your profile
          </h1>

          <h1
            className={`fw300 f92 d-block d-md-none ${style.title} text-white`}
          >
            <span>About you ―</span> Tell us about your work style
          </h1>

          <img
            className={`${style.thank_you_picture}`}
            src="/assets/survey_start.svg"
            alt=""
          />

          <p className={`${style.subtitle} f22 text-white`}>
            Please review your details and update if needed.
          </p>

          <Link href="/survey/profile_setup/question1_1">
            <button>Start</button>
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
