import { useRef } from "react";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";

import IgPostItem from "./igPostItem";

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useTranslation } from "next-i18next";

gsap.registerPlugin(ScrollTrigger);

const IgPostContainer = () => {

  const { t } = useTranslation('common');

  const post = useRef();
  const postTitle = useRef();
  const postItemContainer = useRef();

  useIsomorphicLayoutEffect(() => {

    let ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: post.current,
          start: "top bottom",
          end: "center 60%",
          scrub: 1,
        }
      })
        .from(postTitle.current, {
          y: 300,
        }, 0.1)
        .from(postItemContainer.current, {
          y: 600,
        }, 0.2)

    })

    return () => ctx.revert(); // cleanup

  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="tw-spacing" ref={post}>
      <h3 className="text-xl font-bold text-tw-gray border-gray-600" ref={postTitle}>{t('IG-post-heading')}</h3>
      <ul className="grid md:grid-cols-3 gap-8 mt-10" ref={postItemContainer}>
        <IgPostItem postLink='https://www.instagram.com/p/Cs1RPlJPzzZ/'
        videoPath="/videos/css-loading.mp4"
        ></IgPostItem>
        <IgPostItem postLink='https://www.instagram.com/p/CqawYXUPwY0/'
        videoPath="/videos/css-noise.mp4"
        ></IgPostItem>
        <IgPostItem postLink='https://www.instagram.com/p/CsJVf-1vqSY/'
        videoPath="/videos/canvas-particle-network.mp4"
        ></IgPostItem>
      </ul>
    </div>

  )
}

export default IgPostContainer;
