import { useEffect, useState } from 'react';
import theme from '../styles/theme';

const useWindowWidth = () => {
  const { lg, md } = theme.screens;

  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const parseScreenString = (screenSize: string): number => {
    return parseInt(screenSize.replace('px', ''));
  };

  const modifyWidth = () => {
    setWindowWidth(window.innerWidth);

    if (window.innerWidth > parseScreenString(lg)) {
      setIsDesktop(true);
      setIsTablet(false);
      setIsMobile(false);
    } else if (
      window.innerWidth < parseScreenString(lg) &&
      window.innerWidth > parseScreenString(md)
    ) {
      setIsDesktop(false);
      setIsTablet(true);
      setIsMobile(false);
    } else {
      setIsDesktop(false);
      setIsTablet(false);
      setIsMobile(true);
    }
  };

  useEffect(() => {
    modifyWidth()
    window.addEventListener('resize', modifyWidth);
    return () => {
      window.removeEventListener('resize', modifyWidth);
    };
  }, []);

  return {
    windowWidth,
    isDesktop,
    isTablet,
    isMobile,
  };
};

export default useWindowWidth;
