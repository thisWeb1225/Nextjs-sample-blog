import { useRef, MouseEvent, useState } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

import isDeviceMobile from '../../lib/isDeviceMobile';

import Head from 'next/head';
import Menu from '../menu/menu';
import Footer from '../footer/footer';
import HomeBg from './homeBg';
import Mouse from '../mouse/mouse';

import gsap from 'gsap';

export const siteTitle: string = 'Kun Yang Portfolio';

/**
 * Type
 */
type RootLayoutProps = {
  children: React.ReactNode;
  home?: boolean;
};

/**
 * RootLayout
 */
const RootLayout = ({ children, home }: RootLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (isDeviceMobile()) setIsMobile(true);
  }, []);

  const mouse = useRef<HTMLDivElement>();

  const mouseMove = (e: MouseEvent) => {
    if (!mouse.current) return;
    const x = e.pageX;
    const y = e.pageY;
    gsap.to(mouse.current, {
      x,
      y,
      duration: 0.3,
    });
  };

  const mouseLeave = () => {
    if (!mouse.current) return;
    gsap.to(mouse.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  const mouseEnter = () => {
    if (!mouse.current) return;
    gsap.to(mouse.current, {
      opacity: 1,
      duration: 0.3,
    });
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <meta
          name="description"
          content="Kun Yang's Portfolio"
          key="description"
        />
        <meta name="og:title" content={siteTitle} key="title" />
      </Head>

      {/* BODY */}
      <div
        className="relative text-tw-white text-sm overflow-hidden bg-tw-dark"
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
      >
        {!isMobile && <Mouse ref={mouse}></Mouse>}
        <Menu></Menu>
        {home && <HomeBg></HomeBg>}
        {/* <FadeInOut> */}
        <div className={`${home ?? 'my-36'}`}>{children}</div>
        <Footer></Footer>
        {/* </FadeInOut> */}
      </div>
    </>
  );
};

export default RootLayout;
