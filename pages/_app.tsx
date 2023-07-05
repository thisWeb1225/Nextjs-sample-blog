import '../styles/globals.css';
import '../styles/prism.css';
import { AppProps } from 'next/app';

import { Lenis as ReactLenis } from '@studio-freight/react-lenis';

import { TransitionProvider } from '../context/transitionContext';
import TransitionLayout from '../components/transitionLayout';

import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {

  const lenisOption = {
    lerp: 0.1,
    duration: 1.4,
  }

  return (
    <TransitionProvider>
      <ReactLenis root options={lenisOption}>
        <TransitionLayout>
          <Component {...pageProps} />
        </TransitionLayout>
      </ReactLenis>
    </TransitionProvider>
  )
}

export default appWithTranslation(App);