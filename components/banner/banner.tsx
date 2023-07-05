import { useRef } from "react";

import ParticleText from "../particleText/particleText";
import useResizeParticleText from "../../hooks/useResizeParticleText";

import { ParticleTextContentType } from "../../hooks/useResizeParticleText";

const particleTextContent: ParticleTextContentType = {
  'computer': [
    {
      content: 'Design & Develope website',
      contentCh: '網站設計 & 開發',
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
      contentCh: '我是一名前端工程師',
      color: '#ffffff',
      size: 32,
      weight: 300,
      x: '50%',
      y: '50%+160',
    },
    {
      content: 'I will make your website unique',
      contentCh: '致力於製作獨一無二的品牌網站',
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
      contentCh: '網站設計 & 開發',
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
      contentCh: '我是一名前端工程師',
      color: '#ffffff',
      size: 24,
      weight: 300,
      x: '50%',
      y: '50%+160',
    },
    {
      content: 'I will make your website unique',
      contentCh: '致力於製作獨一無二的品牌網站',
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