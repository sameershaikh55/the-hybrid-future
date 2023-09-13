import style from "./style.module.scss";
import Layout from "@/components/Layout/MainLayout";
import Link from "next/link";

export default function ThankYou() {
  return (
    <Layout title="Thank you">
      <img
        className={`${style.thankyouBg}`}
        src="/assets/thank_youBG.svg"
        alt=""
      />

      <div
        className={`${style.background} position-fixed top-0 bottom-0 h-100 w-100 start-0 end-0`}
      ></div>
      <div className={`${style["thank_you_container"]}`}>
        <div>
          <h1 className={`f92 d-none d-md-block text-white`}>
            <span className="color1">Thank you</span>
            <br />
            your email has been verified
          </h1>

          <h1 className={`f92 d-block d-md-none text-white`}>
            <span className="color1">Thank you</span>
            <br />
            your email is now verified
          </h1>

          <p className={style.subtitle}>
            Please login to set up the rest of your profile.
          </p>

          <Link href="/login?verification=true">
            <button>Login</button>
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
