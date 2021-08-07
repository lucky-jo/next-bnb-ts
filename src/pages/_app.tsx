import App, { AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/header/Header";
import { wrapper } from "../../store";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../../store/user";

function app({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal"></div>
    </>
  );
}

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  // const { data } = await meAPI();
  // console.log(data);
  // store.dispatch(userActions.setLoggedUser(data));
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
