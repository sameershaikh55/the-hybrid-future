import "@/styles/global.scss";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";

import type { AppProps } from "next/app";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(App);
