import '../styles/globals.css';
import '../styles/prism.css';
import { AppProps } from 'next/app';

import { Lenis as ReactLenis } from '@studio-freight/react-lenis';

import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis root>
      <Component {...pageProps} />
    </ReactLenis>
  );
}

export default appWithTranslation(App);
