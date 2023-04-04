import "../styles/globals.css";
import "../styles/GradientBackground.css";
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
