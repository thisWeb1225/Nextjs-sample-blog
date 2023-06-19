import { useEffect, useState, useRef } from "react";
// import ParticleText, { TextOptions } from "./particleText";
import ParticleText, { textOptionsType } from "../particleText/particleText";

const Banner = () => {

  const canvasContainer = useRef();

  let [fonts, setFonts] = useState<textOptionsType[] | []>([]);
  const setTextPosition = () => {
    setFonts([
      {
        content: 'Design & Develope website',
        color: '#ffffff',
        size: 18,
        weight: 300,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 160,
      },
      {
        content: 'Hello, I am Yang',
        color: '#147dfa',
        size: 100,
        weight: 800,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      {
        content: 'I am a front-end Developer',
        color: '#ffffff',
        size: 24,
        weight: 300,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 + 160,
      },
      {
        content: 'I will make your website unique',
        color: '#ffffff',
        size: 24,
        weight: 300,
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
    <div className="w-screen h-screen" ref={canvasContainer}>
      <ParticleText texts={fonts} canvasContainer={canvasContainer.current}></ParticleText>
    </div>
  )
}

export default Banner;