import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { Props } from "./types";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC<Props> = ({ title }) => {
  const router = useRouter();

  // Get the value of the 'verification' parameter from the URL
  const verification = router.pathname;

  const [scrollY, setScrollY] = useState(0);
  const [logoClass, setLogoClass] = useState("");

  useEffect(() => {
    // Listen to the 'scroll' event and update the 'scrollY' state
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update the 'logoClass' state based on the 'scrollY' value
    if (scrollY > 0) {
      setLogoClass(style.logo_small);
    } else {
      setLogoClass("");
    }
  }, [scrollY]);

  return (
    // Apply the background color based on the 'title' prop
    <div
      style={{ background: (title === "Thank you" && "transparent") || "null" }}
      className={`${style["header_container"]} fixed-top d-flex align-items-center justify-content-between`}
    >
      <img
        // Apply the 'logoClass' to the logo based on the 'scrollY' value
        className={`${style.logo} ${logoClass}`}
        src="/assets/logo.svg"
        alt=""
      />

      {/* Show the 'back' button if the 'verification' parameter includes '/survey/profile_setup/' */}
      {verification.includes("/survey/profile_setup/") && (
        <Link href="/login">
          <img src="/assets/back.svg" alt="" />
        </Link>
      )}
    </div>
  );
};

export default Header;
