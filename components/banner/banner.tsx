import { useRef } from "react";

import ParticleText from "../particleText/particleText";
import useResizeParticleText from "../../hooks/useResizeParticleText";

import { ParticleTextContentType } from "../../hooks/useResizeParticleText";

const particleTextContent: ParticleTextContentType = {
  'computer': [
    {
      content: 'Design & Develope website',
      color: '#ffffff',
      size: 20,
      weight: 300,
      x: '50%',
      y: '50%-160',
    },
    {
      content: 'Hello, I am Yang',
      color: '#147dfa',
      size: 100,
      weight: 800,
      x: '50%',
      y: '50%',
    },
    {
      content: 'I am a front-end Developer',
      color: '#ffffff',
      size: 32,
      weight: 300,
      x: '50%',
      y: '50%+160',
    },
    {
      content: 'I will make your website unique',
      color: '#ffffff',
      size: 32,
      weight: 300,
      x: '50%',
      y: '50%+200',
    }
  ],
  'mobile': [
    {
      content: 'Design & Develope website',
      color: '#ffffff',
      size: 20,
      weight: 300,
      x: '50%',
      y: '50%-160',
    },
    {
      content: 'Hello, I am Yang',
      color: '#147dfa',
      size: 64,
      weight: 800,
      x: '50%',
      y: '50%',
    },
    {
      content: 'I am a front-end Developer',
      color: '#ffffff',
      size: 24,
      weight: 300,
      x: '50%',
      y: '50%+160',
    },
    {
      content: 'I will make your website unique',
      color: '#ffffff',
      size: 24,
      weight: 300,
      x: '50%',
      y: '50%+240',
    }
  ]
}

const Banner = () => {

  const banner = useRef<HTMLDivElement>();

  const particleTextState = useResizeParticleText(particleTextContent);

  return (
    <div className="w-screen h-screen" ref={banner}>
      <ParticleText texts={particleTextState} canvasContainer={banner.current}></ParticleText>
    </div>
  )
}

export default Banner;