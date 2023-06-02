import { useCallback, useEffect, useState } from "react";
import ParticleText, { TextOptions } from "./particleText";

const Banner = () => {

  let [fonts, setFonts] = useState<TextOptions[] | []>([]);
  const setTextPosition = () => {
    setFonts([
      {
        content: 'Hello, I am Yang',
        color: '#2ecce0',
        size: 120,
        weight: 800,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      {
        content: 'I am a front-end Developer',
        color: '#ffffff',
        size: 24,
        weight: 400,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 160,
      },
      {
        content: 'I will make your website unique',
        color: '#ffffff',
        size: 24,
        weight: 400,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 200,
      }
    ])
  }
  
  useEffect(() => {
    setTextPosition();
    window.addEventListener('resize', setTextPosition);
  }, [])



  return (
    <div className="w-screen h-screen">
      <ParticleText fonts={fonts}></ParticleText>
    </div>
  )
}

export default Banner;