import { useRef, MouseEvent, useState } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

import isDeviceMobile from '../../lib/isDeviceMobile';

import Head from 'next/head';
import Menu from '../menu/index';
import Footer from '../footer/index';
import HomeBg from './homeBg';
import Mouse from '../mouse/index';

import FadeInOut from '../../animation/fadeInOut';

export const siteTitle: string = 'Kun Yang Portfolio'

/**
 * Type
 */
type RootLayoutProps = {
  children: React.ReactNode,
  home?: boolean
}

/**
 * RootLayout
 */
const RootLayout = ({ children, home }: RootLayoutProps) => {

  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (isDeviceMobile()) setIsMobile(true);
  }, [])

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
        {!isMobile && <Mouse ref={mouse}></Mouse>}
        <Menu></Menu>
        {home && <HomeBg></HomeBg>}
        <FadeInOut>
          <div className={`${home ?? 'my-52'}`}>
          {children}
          </div>
          <Footer></Footer>
        </FadeInOut>
      </div>
    </>
  );
};

export default RootLayout;
