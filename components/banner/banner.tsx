import { useRef } from "react";

import ParticleText from "../particleText/particleText";
import useResizeParticleText from "../../hooks/useResizeParticleText";

import { ParticleTextContentType } from "../../hooks/useResizeParticleText";

const particleTextContent: ParticleTextContentType = {
  'computer': [
    {
      content: 'Hi there, my name is 👇',
      contentCh: '你好，我是 👇',
      color: '#ffffff',
      size: 28,
      weight: 300,
      x: '50%',
      y: '50%-120',
    },
    {
      content: 'Kun Yang',
      color: '#147dfa',
      size: 100,
      weight: 800,
      x: '50%',
      y: '50%',
    },
    {
      content: 'I’m a self-taught front-end developer based in Taoyuan, Taiwan.',
      contentCh: '我是一名居住於台灣桃園的前端開發者',
      color: '#ffffff',
      size: 28,
      weight: 300,
      x: '50%',
      y: '50%+120',
    },
    {
      content: 'I will make your website unique',
      contentCh: '致力於製作獨一無二的品牌網站',
      color: '#ffffff',
      size: 28,
      weight: 300,
      x: '50%',
      y: '50%+180',
    }
  ],
  'mobile': [
    {
      content: 'Hi there, my name is 👇',
      contentCh: '你好，我是 👇',
      color: '#ffffff',
      size: 20,
      weight: 200,
      x: '50%',
      y: '50%-120',
    },
    {
      content: 'Kun Yang',
      color: '#147dfa',
      size: 64,
      weight: 800,
      x: '50%',
      y: '50%',
    },
    {
      content: 'I’m a front-end developer based in Taoyuan, Taiwan.',
      contentCh: '我是一名居住於台灣桃園的前端開發者',
      color: '#ffffff',
      size: 20,
      weight: 200,
      x: '50%',
      y: '50%+120',
    },
    {
      content: 'I will make your website unique',
      contentCh: '致力於製作獨一無二的品牌網站',
      color: '#ffffff',
      size: 20,
      weight: 200,
      x: '50%',
      y: '50%+200',
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