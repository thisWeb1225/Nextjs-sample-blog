import { useRef, useEffect } from "react";
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const About = () => {

  const about = useRef(null);
  const aboutContent = useRef(null);
  const aboutContentTitle = useRef(null);
  const aboutBtnParent = useRef(null);
  const aboutBtnChild1 = useRef(null);
  const aboutBtnChild2 = useRef(null);
  useFollowMouseEffect(aboutBtnParent, aboutBtnChild1, aboutBtnChild2);

  useEffect(() => {

    let ctx = gsap.context(() => {
      
      gsap.timeline({scrollTrigger:{
        trigger: about.current,
        start:  "top 50%",  
        end:  "bottom top",
        toggleActions:  "restart none none reset"
      }})
      .from(aboutContentTitle.current, {
        y: 200,
        opacity: 0,
        duration: .8,
      })
      .from(aboutContent.current, {
        y: 200,
        opacity: 0,
        duration: .8,
      }, '-=0.4')
      // .from(aboutBtnParent.current, {
      //   opacity: 0,
      //   rotate: 360,
      //   duration: .8,
      // }, '-=0.4');

    })
      
    
    return () => ctx.revert(); // cleanup
    
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-y-16 md:gap-4 text-center py-16 px-2 sm:px-8 md:px-24 lg:px-32 border-neutral-600 rounded-md" ref={about}>
      <div className="text-left flex flex-col gap-8">
        <p  className="text-tw text-4xl font-extrabold uppercase text-tw-primary border-b-[1px] border-gray-600 pb-8" ref={aboutContentTitle}>
          " Creating Web Is an Art "
        </p>
        <p ref={aboutContent}>
          I love UI design and web's animation design.
          <br />
          <br />
          I believe that creating webs is an art, so I founded an instagram social media to share tutorials on front-end effects. Within six months, I has been attracted over 2000 followers.
          <br />
          <br />
          In the future, I want to promote the front-end artistic effects in Taiwan, To make Taiwanese webpages more interesting.
        </p>
      </div>

      <div ref={aboutBtnParent} className="self-end row-[2/2] col-[1/2] md:col-[2/2] w-fit justify-self-center">
        <div className=" rounded-full p-6 aspect-square grid place-content-center border-[1px] border-gray-600 relative overflow-hidden after:absolute after:inset-0 after:bg-tw-primary after:translate-y-[100%] hover:after:translate-y-[0%] after:duration-300 after:origin-bottom after:rounded-full group" ref={aboutBtnChild1}>
          <p className="text-base sm:text-xl z-[1] text-tw-white pointer-events-none" ref={aboutBtnChild2}>About Me</p>
        </div>
      </div>

    </div>
  )
}

export default About;