import { useRef } from 'react';

import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import useResizeParticleText from '../../hooks/useResizeParticleText';
import useFollowMouseEffect from '../../hooks/useFollowMouseEffect';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import ParticleText from '../particleText/particleText';
import { ParticleTextContentType } from '../../hooks/useResizeParticleText';

import { useTranslation } from 'next-i18next';

gsap.registerPlugin(ScrollTrigger);

const particleTextContent: ParticleTextContentType = {
  computer: [
    {
      content: 'Web development is an art',
      color: '#147dfa',
      size: 48,
      weight: 600,
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      },
    },
  ],
  tablet: [
    {
      content: 'Web development is an art',
      color: '#147dfa',
      size: 32,
      weight: 600,
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      },
    },
  ],
  mobile: [
    {
      content: 'Web development is an art',
      color: '#147dfa',
      size: 32,
      weight: 600,
      x: 0,
      y: '50%',
      align: {
        x: 'start',
        y: 'middle',
      },
    },
  ],
};

const About = () => {
  const about = useRef(null);
  const aboutContent = useRef(null);
  const aboutContentTitle = useRef<HTMLDivElement>(null);
  const aboutBtnParent = useRef(null);
  const aboutBtnChild1 = useRef(null);
  const aboutBtnChild2 = useRef(null);
  useFollowMouseEffect(aboutBtnParent, aboutBtnChild1, aboutBtnChild2);

  const particleTextState = useResizeParticleText(particleTextContent);

  const { t } = useTranslation('common', { keyPrefix: 'about-content' });

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: about.current,
            start: 'top bottom',
            end: 'center 60%',
            scrub: 1,
          },
        })
        .from(
          aboutContentTitle.current,
          {
            y: 200,
          },
          0.1
        )
        .from(
          aboutContent.current,
          {
            y: 300,
          },
          0.2
        )
        .from(
          aboutBtnParent.current,
          {
            y: 300,
          },
          0.3
        );
    });

    return () => {
      ctx.revert();
    };
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-y-16 md:gap-4 text-center tw-spacing rounded-md mt-36"
      ref={about}
    >
      <div className="text-left flex flex-col gap-8 col-[1/3]">
        <div
          className="h-28 border-b-[1px] border-x-tw-gray"
          ref={aboutContentTitle}
        >
          {/* " Creating Web Is an Art " */}
          <ParticleText
            texts={particleTextState}
            canvasContainer={aboutContentTitle.current}
          ></ParticleText>
        </div>
        <p ref={aboutContent}>
          {t('description1')}
          <br />
          <br />
          {t('description2')}
          <br />
          <br />
          {t('description3')}
        </p>
      </div>

      <div
        ref={aboutBtnParent}
        className="self-end row-[2/2] col-[1/2] md:col-[2/2] w-fit justify-self-center"
      >
        <div
          className=" rounded-full p-4 aspect-square grid place-content-center border-[1px] border-gray-600 relative overflow-hidden after:absolute after:inset-0 after:bg-tw-primary after:translate-y-[100%] hover:after:translate-y-[0%] after:duration-300 after:origin-bottom after:rounded-full group"
          ref={aboutBtnChild1}
        >
          <p
            className="text-base sm:text-xl z-[1] text-tw-white pointer-events-none whitespace-nowrap"
            ref={aboutBtnChild2}
          >
            Contact Me
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
