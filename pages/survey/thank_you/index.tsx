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
          <h1 className={`fw-normal f88`}>
            <span className="fw800">Thank you</span>
            <br />
            your profile is now complete
          </h1>

          <img
            className={`${style.thank_you_picture} d-none d-xl-block`}
            src="/assets/thankyou.svg"
            alt=""
          />

          <p className={style.subtitle}>
            Your details have been saved. We will occasionally prompt you to
            update them.
          </p>

          <Link href="/login">
            <button onClick={() => sessionStorage.clear()}>Log out</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
