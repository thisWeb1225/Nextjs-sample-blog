import { useRef } from "react";

import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import useResizeParticleText from "../../hooks/useResizeParticleText";
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import ParticleText from "../particleText/particleText";
import { ParticleTextContentType } from "../../hooks/useResizeParticleText";

gsap.registerPlugin(ScrollTrigger);

const particleTextContent: ParticleTextContentType = {
  'computer': [
    {
      content: '" Creating Web Is an Art "',
      color: '#147dfa',
      size: 48,
      weight: 600,
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      }
    },
  ],
  'mobile': [
    {
      content: 'Creating Web Is an Art',
      color: '#147dfa',
      size: 32,
      weight: 600,
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      }
    }
  ]
}

const About = () => {

  const brige = useRef(null);
  const about = useRef(null);
  const aboutContent = useRef(null);
  const aboutContentTitle = useRef<HTMLDivElement>(null);
  const aboutBtnParent = useRef(null);
  const aboutBtnChild1 = useRef(null);
  const aboutBtnChild2 = useRef(null);
  useFollowMouseEffect(aboutBtnParent, aboutBtnChild1, aboutBtnChild2);

  const particleTextState = useResizeParticleText(particleTextContent);

  useIsomorphicLayoutEffect(() => {

    let ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: about.current,
          start: "top bottom",
          end: "center top",
          scrub: 1,
        }
      })
        .from(brige.current, {
          y: 100,
          opacity: 0,
        }, 0)
        .from(aboutContentTitle.current, {
          y: 200,
        }, 0.1)
        .from(aboutContent.current, {
          y: 300,
        }, 0.2)
        .from(aboutBtnParent.current, {
          y: 300,
        }, 0.3);

    });

    return () => {
      ctx.revert();
    }
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <>
      <p className="text-base text-center text-tw-gray my-48" ref={brige}>So, what is my ideal for creating a website?</p>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-y-16 md:gap-4 text-center tw-spacing rounded-md" ref={about}>
        <div className="text-left flex flex-col gap-8">
          <div className="h-28 border-b-[1px] border-x-tw-gray" ref={aboutContentTitle}>
            {/* " Creating Web Is an Art " */}
            <ParticleText texts={particleTextState} canvasContainer={aboutContentTitle.current}></ParticleText>
          </div>
          {/* <p ref={aboutContent}>
            I love UI design and web's animation design.
            <br />
            <br />
            I believe that creating webs is an art, so I founded an instagram social media to share tutorials on front-end effects. Within six months, I has been attracted over 2000 followers.
            <br />
            <br />
            In the future, I want to promote the front-end artistic effects in Taiwan, To make Taiwanese webpages more interesting.
          </p> */}
          <p ref={aboutContent}>
            I believe that creating a website is an art form, encompassing visual design, user flow and experience, as well as development and maintenance. Every detail requires careful craftsmanship.
            <br />
            <br />
            To me, a good user experience is like a perfect piece of art, embedded with countless subtle intricacies.
            <br />
            <br />
            As a result, I approach each project and job with utmost seriousness and dedication, aspiring to build more unique websites and deliver flawless works.
          </p>
        </div>

        <div ref={aboutBtnParent} className="self-end row-[2/2] col-[1/2] md:col-[2/2] w-fit justify-self-center">
          <div className=" rounded-full p-6 aspect-square grid place-content-center border-[1px] border-gray-600 relative overflow-hidden after:absolute after:inset-0 after:bg-tw-primary after:translate-y-[100%] hover:after:translate-y-[0%] after:duration-300 after:origin-bottom after:rounded-full group" ref={aboutBtnChild1}>
            <p className="text-base sm:text-xl z-[1] text-tw-white pointer-events-none" ref={aboutBtnChild2}>About Me</p>
          </div>
        </div>

      </div>
    </>

  )
}

export default About;