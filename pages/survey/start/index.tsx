import style from "./style.module.scss";
import Layout from "@/layout";
import Link from "next/link";

export default function Start() {
  return (
    <Layout title="Start Survey">
      <div className={`${style["start_survey_container"]} mx-auto`}>
        <div>
          <h1 className={`fw-normal f64 d-none d-md-block ${style.title}`}>
            <span className="fw800">About you ―</span> Tell us about your work
            style
          </h1>

          <h1 className={`fw-normal f64 d-block d-md-none ${style.title}`}>
            <span className="fw800">About you ―</span> Tell us about your work
            style
          </h1>

          <img
            className={`${style.thank_you_picture} d-none d-xl-block`}
            src="/assets/survey_start.svg"
            alt=""
          />

          <p className={`${style.subtitle} f22`}>
            We’d like to learn about you and what you find important to your
            work, to understand your work style. Remember, your answers remain
            anonymous and confidential.
          </p>

          <Link href="/survey/profile_setup/q1">
            <button>Create profile</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
