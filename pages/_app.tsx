import '../styles/globals.css';

import 'prismjs/themes/prism-tomorrow.css';

import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';

function MyApp({ Component, pageProps, globalData }) {
  return (
    <Layout>
      <span className="theme-bejamas" />
      <Component {...pageProps} />
      <Footer />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}


export default MyApp;
