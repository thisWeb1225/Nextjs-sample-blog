import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger)

const HomeBg = () => {

  const bg1 = useRef();
  const bg2 = useRef();
  const bgParent = useRef<HTMLDivElement>();

  useEffect(() => {
    let width = bgParent.current.clientWidth;
    let height = bgParent.current.clientHeight;
    
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          start:  "100 top",  
          end:  "bottom bottom",
          scrub: 2,
        }
      })
      .fromTo(bg1.current, {
        x: width / 20,
        y: height,
        scale: 6,
      }, {
        x: width,
        y: 0,
        scale: 8,
      })
      .to(bg1.current, {
        x: width / 1.2,
        y: height / 4,
        scale: 10,
      })
      .to(bg1.current, {
        x: width,
        y: height / 2,
        scale: 10,
      })
      .to(bg1.current, {
        x: width,
        y: height / 1.2,
        scale: 8,
      })

      gsap.timeline({
        scrollTrigger: {
          start:  "100 top",  
          end:  "bottom bottom",
          scrub: 2,
        }
      })
      .fromTo(bg2.current, {
        x: width / 20 * 19,
        y: 0,
        scale: 6,
      }, {
        x: width,
        y: height / 2,
        scale: 8,
      })
      .to(bg2.current, {
        x: width,
        y: height / 1.2,
        scale: 10,
      })
      .to(bg2.current, {
        x: width / 10,
        y: height / 1.2,
        scale: 8,
      })
      .to(bg2.current, {
        x: width / 1.2,
        y: height,
        scale: 8,
      })
    
    })

    

    return () => ctx.revert();
  }, [])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none" ref={bgParent}>
      <div className="w-14 h-14 bg-tw-secondary blur-md opacity-20 absolute -left-14 animate-homeBgFlow" ref={bg1}></div>
      <div className="w-14 h-14 bg-purple-600 blur-md opacity-20 absolute -left-14 animate-homeBgFlow" ref={bg2}></div>
    </div>
  )
}

export default HomeBg;