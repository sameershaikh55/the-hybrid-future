import { Props } from "./types";
import HeadURL from "@/components/Head";
import Header from "@/components/Header/index";
import style from "./style.module.scss";

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <HeadURL title={title} />
      <Header title={title} />
      <div className={style["page_container"]}>{children}</div>
    </>
  );
};

export default Layout;
