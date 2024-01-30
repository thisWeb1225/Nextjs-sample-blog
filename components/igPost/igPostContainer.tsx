import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

import IgPostItem from './igPostItem';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useTranslation } from 'next-i18next';

gsap.registerPlugin(ScrollTrigger);

const IgPostContainer = () => {
  const { t } = useTranslation('common');

  const post = useRef();
  const postTitle = useRef();
  const postContent = useRef();
  const postItemContainer = useRef();

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: post.current,
            start: 'top bottom',
            end: 'center 60%',
            scrub: 1,
          },
        })
        .from(
          postTitle.current,
          {
            y: 300,
          },
          0
        )
        .from(
          postContent.current,
          {
            y: 450,
          },
          0.1
        )
        .from(
          postItemContainer.current,
          {
            y: 600,
          },
          0.2
        );
    });

    return () => ctx.revert(); // cleanup
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="tw-spacing mt-36" ref={post}>
      <h3 className="text-4xl text-tw-primary font-bold" ref={postTitle}>
        {t('IG-post-heading')}
      </h3>
      <p className="mt-6 text-tw-white max-w-[80%]" ref={postContent}>
        {t('IG-post-content.description1')}
        <br />
        <br />
        {t('IG-post-content.description2')}
      </p>
      <ul
        className="grid md:grid-cols-3 gap-4 lg:gap-8 mt-16"
        ref={postItemContainer}
      >
        <IgPostItem
          postLink="https://www.instagram.com/p/Cs1RPlJPzzZ/"
          videoPath="/videos/css-loading.mp4"
        ></IgPostItem>
        <IgPostItem
          postLink="https://www.instagram.com/p/CqawYXUPwY0/"
          videoPath="/videos/css-noise.mp4"
        ></IgPostItem>
        <IgPostItem
          postLink="https://www.instagram.com/p/CsJVf-1vqSY/"
          videoPath="/videos/canvas-particle-network.mp4"
        ></IgPostItem>
      </ul>
    </div>
  );
};

export default IgPostContainer;
