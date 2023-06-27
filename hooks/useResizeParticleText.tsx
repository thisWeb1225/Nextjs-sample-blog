import { useCallback, useState } from "react";

import { TextOptionsType } from "../components/particleText/particleText";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import isDeviceMobile from "../lib/isDeviceMobile";

export type ParticleTextContentType = {
  computer: Array<TextOptionsType>;
  tablet?: Array<TextOptionsType>;
  mobile?: Array<TextOptionsType>;
}

const useResizeParticleText = (particleTextContent: ParticleTextContentType | null) => {

  const [particleText, setParticleText]  = useState<TextOptionsType[] | []>([]);
  
  const changeParticleTextOptions = useCallback(() => {

    if (!particleTextContent) return;

    // To prevent scrolling on mobile and trigger the resize function when the navigation bar is hidden
    // we need set the variable to store initHeight
    const initHeight = window.innerHeight;

    // if the device is mobile and the height was change, it is mean the navigation bar be hidden, so don't do anything 
    if (isDeviceMobile() && initHeight !== window.innerHeight) return;

    setParticleText(particleTextContent.computer);
    
    if (window.innerWidth > 768) { // computer
      setParticleText(particleTextContent.computer);
    } else if (window.innerWidth <= 768 && window.innerWidth > 640) { // tablet
      if (particleTextContent?.tablet) setParticleText(particleTextContent.tablet)
    } else if (window.innerWidth <= 640) { // mobile
      if (particleTextContent?.mobile) setParticleText(particleTextContent.mobile)
    };

  }, [particleTextContent, isDeviceMobile])  

  useIsomorphicLayoutEffect(() => {
    changeParticleTextOptions()
    window.addEventListener('resize', changeParticleTextOptions);
    return () => window.removeEventListener('resize', changeParticleTextOptions);
  }, [particleTextContent])

  return particleText || [];
}

export default useResizeParticleText;