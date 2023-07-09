import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BrigeTextType = {
  content: string
}

const BrigeText = ({ content }: BrigeTextType) => {

  const text = useRef();

  useIsomorphicLayoutEffect(() => {

    let ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: text.current,
          start: "top bottom",
          end: "top 70%",
          scrub: 1,
        }
      })
        .from(text.current, {
          y: 100,
          opacity: 0,
        })
    })

    return () => ctx.revert(); // cleanup

  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <p className="text-lg text-center text-tw-white my-52" ref={text}>{content}</p>
  )
}

export default BrigeText