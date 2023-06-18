import '../styles/globals.css';
import { AppProps } from 'next/app';
import "prismjs/themes/prism-tomorrow.min.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function App({Component, pageProps}: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default App;