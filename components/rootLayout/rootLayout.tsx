import { useRef, MouseEvent } from 'react';

import Head from 'next/head';
import Menu from '../menu/index';
import Footer from '../footer/index';
import HomeBg from './homeBg';
import Mouse from '../mouse/index';

import FadeInOut from '../../animation/fadeInOut';

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
        <link
          rel="icon"
          href="/favicon.ico"
          key="favicon"
        />
        <meta
          name="description"
          content="Kun Yang's Portfolio"
          key="description"
        />
        <meta
          name="og:title"
          content={siteTitle}
          key="title"
        />
      </Head>

      {/* BODY */}
      <div className='relative text-tw-white text-sm overflow-hidden' onMouseMove={mouseMove}>
        <Mouse ref={mouse}></Mouse>
        <Menu></Menu>
        <FadeInOut>
          {home && <HomeBg></HomeBg>}
          {children}
          <Footer></Footer>
        </FadeInOut>
      </div>
    </>
  );
};

export default RootLayout;
