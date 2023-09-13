import style from "./style.module.scss";
import Layout from "@/components/Layout/MainLayout";
import Link from "next/link";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("invite_code");
    if (inviteCode) {
      sessionStorage.setItem("invite_code", inviteCode);
    }
  }, []);

  return (
    <Layout title="Welcome">
      <img
        className={`${style.welcomeBg}`}
        src="/assets/welcomeBg.svg"
        alt=""
      />
      <div className={`${style["welcome_container"]} mx-auto`}>
        <div>
          <h1 className={`text-white ${style.title}`}>
            <span className={style.highlight}>Welcome ―</span>
            <br className="d-block d-md-none" /> it’s time{" "}
            <br className="d-none d-sm-block" /> to inform the future of{" "}
            <br className="d-none d-sm-block" /> our hybrid working world
          </h1>

          <p className={`${style.subtitle} text-white`}>
            Set up your profile to join the definitive investigation into{" "}
            <br className="d-none d-sm-block" /> the impact of hybrid work on
            people, places and society.
          </p>

          <Link href="/register">
            <button>Register</button>
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
