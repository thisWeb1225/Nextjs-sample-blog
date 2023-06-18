import { useRef, MouseEvent } from 'react';

import Head from 'next/head';
import Menu from '../menu/index';
import Footer from '../footer/index';
import HomeBg from './homeBg';
import Mouse from '../mouse/index';

export const siteTitle: string = 'Kun Yang Portfolio'

type RootLayoutProps = {
  children: React.ReactNode,
  home?: boolean
}

const RootLayout = ({ children, home }: RootLayoutProps) => {

  const mouse = useRef<HTMLDivElement>();

  const mouseMove = (e: MouseEvent) => {
    if (!mouse.current) return;
    const x = e.pageX;
    const y = e.pageY;
    // mouse.current.style.transform = `translate(${x}px, ${y}px)`;
    mouse.current.style.setProperty('--x', `${x}px`);
    mouse.current.style.setProperty('--y', `${y}px`);
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Kun Yang's Portfolio"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
          as="script"
        />
      </Head>

      {
        /**
         * Body
         */
      }
      <div className='bg-tw-dark text-tw-white text-sm relative overflow-x-hidden' onMouseMove={mouseMove}>
        <Mouse ref={mouse}></Mouse>
        <Menu></Menu>
        {home && <HomeBg></HomeBg>}
        {children}
        <Footer></Footer>
      </div>
    </>
  );
};

export default RootLayout;
