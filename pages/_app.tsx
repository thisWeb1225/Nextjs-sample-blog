import '../styles/globals.css'
import { AppProps } from 'next/app'
import "prismjs/themes/prism-tomorrow.min.css";

function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default App;