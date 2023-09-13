import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/global.scss";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import AuthWrapper from "../components/AuthWrapper";
import { PageList } from "@/constants/backPagesRoutes";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = PageList.includes(router.pathname)
      ? "#121212"
      : "#FFF";
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

export default wrapper.withRedux(App);
