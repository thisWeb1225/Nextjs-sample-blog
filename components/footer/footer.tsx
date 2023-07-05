import { useRef } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

import Image from "next/image";

import ParticleText from "../particleText/particleText";
import useResizeParticleText, { ParticleTextContentType } from "../../hooks/useResizeParticleText";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const particleTextContent: ParticleTextContentType = {
  'computer': [
    {
      content: 'Let’s work together',
      size: 48,
      weight: 400,
      color: '#ffffff',
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      },
    }
  ],
  'mobile': [
    {
      content: 'Let’s work together',
      size: 36,
      weight: 400,
      color: '#ffffff',
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      },
    }
  ]
}

const Footer = () => {

  const footer = useRef();
  const footerTitle = useRef<HTMLDivElement>();
  const footerLine = useRef();
  const footerContent = useRef();

  const particleTextState = useResizeParticleText(particleTextContent)

  useIsomorphicLayoutEffect(() => {
    /**
     * GSAP
     */
    let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: footer.current,
          start: "top bottom",
          end: "center 80%",
          scrub: 1,
        }
      })
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

    return () => ctx.revert(); // cleanup

  }, []); // <- empty dependency Array so it doesn't re-run on 


  return (
      <div className="tw-spacing pb-40 grid gap-8" ref={footer}>
        <div className="flex items-center gap-8 h-20 w-full" ref={footerTitle}>
          <Image
            priority
            src="/images/avatar.jpg"
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full flex-grow-0"
          />
          <ParticleText texts={particleTextState} canvasContainer={footerTitle.current}></ParticleText>
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