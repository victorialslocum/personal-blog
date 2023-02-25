import Layout from "../components/layout";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="icon" type="image/png" href="/public/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default MyApp;
