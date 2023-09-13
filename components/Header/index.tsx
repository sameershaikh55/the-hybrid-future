import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PageList } from "@/constants/backPagesRoutes";
import LogoutModal from "../Modals/Logout";
import { Props } from "./types";

const Header: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const router = useRouter();

  const [scrollY, setScrollY] = useState(0);
  const [logoClass, setLogoClass] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setLogoClass(scrollY > 0 ? style.logo_small : "");
  }, [scrollY]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isInPageList = PageList.includes(router.pathname);
  const isWidthSmall = width < 575;

  const backButton = (src: string | undefined) => (
    <div onClick={handleModalToggle} className="pointer">
      <img className="pointer" src={src} alt="" />
    </div>
  );

  const logo = (src: string | undefined) => (
    <img className={`${style.logo} ${logoClass}`} src={src} alt="" />
  );

  return (
    <div
      className={`${style.header_container} ${
        isInPageList ? style.blackBG : style.whiteBG
      } fixed-top d-flex align-items-center justify-content-between`}
    >
      {isModalOpen && (
        <LogoutModal isOpen={true} onClose={() => setIsModalOpen(false)} />
      )}

      {isInPageList ? logo("/assets/logow.svg") : logo("/assets/logo.svg")}

      {router.pathname !== "/survey/thank_you" &&
        router.pathname.includes("/survey/") &&
        (isInPageList ? backButton("/assets/backw.svg") : backButton("/assets/back.svg"))}

      {router.pathname === "/survey/thank_you" &&
        (isWidthSmall ? backButton("/assets/backw.svg") : backButton("/assets/back.svg"))}

      {router.pathname.includes("/campaign") &&
        (isWidthSmall ? backButton("/assets/backw.svg") : backButton("/assets/back.svg"))}

      {router.pathname.includes("/no_question") &&
        (isWidthSmall ? backButton("/assets/backw.svg") : backButton("/assets/back.svg"))}
    </div>
  );
};

export default Header;
