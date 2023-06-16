import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger)

const HomeBg = () => {

  const bg = useRef();
  const bgParent = useRef<HTMLDivElement>();

  useEffect(() => {
    const width = bgParent.current.clientWidth;
    const height = bgParent.current.clientHeight;
    console.log(height)

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          start:  "100 top",  
          end:  "bottom top",
          markers: true,
          scrub: 2,
        }
      })
      .fromTo(bg.current, {
        x: 0,
        y: 0,
        scale: 4,
      }, {
        x: width,
        y: 0,
        scale: 8,
      })
      .to(bg.current, {
        x: width + 200,
        y: 80,
        scale: 16,
      })
      .to(bg.current, {
        x: 0,
        y: height,
        scale: 6,
      })
      .to(bg.current, {
        x: width,
        y: height,
        scale: 8,

      })
      .to(bg.current, {
        x: 500,
        y: 500,
      })
    })

    return () => ctx.revert();
  }, [])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none" ref={bgParent}>
      <div className="w-14 aspect-square bg-orange-500 blur-xl opacity-40 absolute -left-14" ref={bg}></div>
    </div>
  )
}

export default HomeBg;