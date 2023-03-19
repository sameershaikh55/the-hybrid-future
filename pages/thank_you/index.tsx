import style from "./style.module.scss";
import Layout from "@/layout";
import Link from "next/link";

export default function ThankYou() {
  return (
    <Layout title="Thank you">
      <div
        className={`${style.background} position-fixed top-0 bottom-0 h-100 w-100 start-0 end-0`}
      ></div>
      <div className={`${style["thank_you_container"]} mx-auto`}>
        <div>
          <h1 className={`fw-normal f92 d-none d-md-block`}>
            <span className="fw800">Thank you</span>
            <br />
            your email has been verified
          </h1>

          <h1 className={`fw-normal f92 d-block d-md-none`}>
            <span className="fw800">Thank you</span>
            <br />
            your email is now verified
          </h1>

          <img
            className={`${style.thank_you_picture} d-none d-xl-block`}
            src="/assets/thankyou.svg"
            alt=""
          />

          <p className={style.subtitle}>Please login to start the survey.</p>

          <Link href="/login?verification=true">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
