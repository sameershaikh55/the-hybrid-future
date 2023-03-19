import style from "./style.module.scss";
import Layout from "@/layout";
import Link from "next/link";

export default function Welcome() {
  return (
    <Layout title="Welcome">
      <div className={`${style["welcome_container"]} mx-auto`}>
        <div>
          <h1 className={`fw-normal ${style.title}`}>
            <span className={style.highlight}>Welcome ―</span>
            <br className="d-block d-md-none" /> to the definitive investigation
            into the impact of hybrid work on people, places and society.
          </h1>

          <p className={style.subtitle}>
            Tell us about your working experience and help shape the future of
            our hybrid world.
          </p>

          <Link href="/login">
            <button>Login</button>
          </Link>

          <div className={style.info}>
            <p className={style.infoTitle}>Lorem ipsum</p>

            <div className={style.logos}>
              {[1, 1, 1, 1].map(() => {
                return (
                  <img className={style.logo} src="/assets/logo.svg" alt="" />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
