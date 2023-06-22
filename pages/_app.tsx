import '../styles/globals.css';
import '../styles/prism.css';
import { AppProps } from 'next/app';

import { Lenis as ReactLenis } from '@studio-freight/react-lenis';

import { TransitionProvider } from '../context/transitionContext';
import TransitionLayout from '../components/transitionLayout';

function App({ Component, pageProps }: AppProps) {

  const lenisOption = {
    lerp: 0.4,
    duration: 2,
  }

  return (
    <TransitionProvider>
      <TransitionLayout>
        <ReactLenis root options={lenisOption}>
          <Component {...pageProps} />
        </ReactLenis>
      </TransitionLayout>
    </TransitionProvider>
  )
}

export default App;