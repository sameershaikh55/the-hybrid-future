import style from "./style.module.scss";
import Layout from "@/components/Layout/MainLayout";
import Link from "next/link";

export default function Campaign() {
  return (
    <Layout title="Campaign">
      <img
        className={style.welcomeBg}
        src="/assets/campaignStart.svg"
        alt=""
      />
      <div className={style["thank_you_container"]}>
        <div>
          <h1 className="f88 text-white">
            <span className="color1">Tell us ―</span>
            <br />
            about your hybrid working experience
          </h1>

          <p className={`${style.subtitle} text-white`}>
            It usually takes
            <strong className="text-white"> 90 seconds </strong> to complete.
          </p>

          <Link href="/login">
            <button onClick={() => sessionStorage.clear()}>Start</button>
          </Link>
        </div>
      </div>
      <div className={`${style.tagline} w-100 pb-4`}>
        <div
          className="d-flex flex-row justify-content-between align-items-end w-100 gap-5"
        >
          <img className={style.logo} src="/assets/lessmanLogo.svg" alt="" />
          <img className={style.logo} src="/assets/realEstate.svg" alt="" />
        </div>
      </div>
    </Layout>
  );
}
