import { useCallback, useState } from 'react';

import { TextOptionsType } from '../components/particleText/particleText';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useWindowWidth from './useWindowWidth';
import isDeviceMobile from '../lib/isDeviceMobile';

export type ParticleTextContentType = {
  computer: Array<TextOptionsType>;
  tablet?: Array<TextOptionsType>;
  mobile?: Array<TextOptionsType>;
};

const useResizeParticleText = (
  particleTextContent: ParticleTextContentType | null
) => {
  const [particleText, setParticleText] = useState<TextOptionsType[] | []>([]);
  const { isDesktop, isTablet, isMobile } = useWindowWidth();

  const changeParticleTextOptions = useCallback(() => {
    if (!particleTextContent) return;

    setParticleText(particleTextContent.computer);

    if (isDesktop) {
      setParticleText(particleTextContent.computer);
    } else if (isTablet) {
      if (particleTextContent?.tablet)
        setParticleText(particleTextContent.tablet);
    } else if (isMobile) {
      if (particleTextContent?.mobile)
        setParticleText(particleTextContent.mobile);
    }
  }, [particleTextContent, isDesktop, isTablet, isMobile]);

  useIsomorphicLayoutEffect(() => {
    changeParticleTextOptions();
  }, [changeParticleTextOptions]);

  return particleText || [];
};

export default useResizeParticleText;
