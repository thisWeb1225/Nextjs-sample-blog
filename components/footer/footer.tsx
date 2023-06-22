import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import ParticleText, { textOptionsType } from "../particleText/particleText";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  const footer = useRef()
  const footerTitle = useRef<HTMLDivElement>();
  const footerLine = useRef();
  const footerContent = useRef();

  const [particleText, setParticleText] = useState<textOptionsType[]>([])

  useEffect(() => {

    /**
     * GSAP
     */
    let ctx = gsap.context(() => {
      gsap.timeline({scrollTrigger:{
        trigger: footer.current,
        start:  "top bottom",  
        end:  "center 80%",
        scrub: 1,
      }})
      .from(footerTitle.current, {
        y: 300,
      }, 0)
      .from(footerLine.current, {
        y: 300,
      }, 0.2)
      .from(footerContent.current, {
        y: 300,
      }, 0.4)
    })
    
    /**
     * Particle Text
     */
    setParticleText([
      {
        content: 'Let’s work together',
        size: 48,
        weight: 400,
        color: '#ffffff',
        x: 0,
        y: footerTitle.current.clientHeight / 2,
        center: {
            x: 'start',
            y: 'middle',
        },
      }
    ])

    return () => ctx.revert(); // cleanup
    
  }, []); // <- empty dependency Array so it doesn't re-run on 

  return (
    <div className="tw-spacing mt-52 pb-40 grid gap-8" ref={footer}>
        <div className="flex items-center gap-8 h-20" ref={footerTitle}>        
          <Image
          priority
          src="/images/avatar.jpg"
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full flex-grow-0"
          /> 
          <ParticleText texts={particleText} canvasContainer={footerTitle.current}></ParticleText>
          {/* <p className="text-4xl">Let’s work together</p> */}
        </div>
      <div className="tw-line" ref={footerLine}></div>
      <div className="grid gap-4 justify-start whitespace-break-spaces text-base" ref={footerContent}>
        <a href="https://www.instagram.com/this.web/" target="_blank" className="tw-link">Instagram : this.web</a>
        <a href="mailto:kun881225@gmail.com" target="_blank" className="tw-link">Gmail : kun881225@gmail.com</a>
      </div>
    </div>
  )
}

export default Footer;