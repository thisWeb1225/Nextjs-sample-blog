import { useRef } from "react";
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

const About = () => {

  const aboutBtnParent = useRef(null)
  const aboutBtnChild1 = useRef(null);
  const aboutBtnChild2 = useRef(null);
  useFollowMouseEffect(aboutBtnParent, aboutBtnChild1, aboutBtnChild2);

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-y-16 md:gap-4 text-center py-16 px-2 sm:px-8 md:px-24 lg:px-32 border-neutral-600 rounded-md">
      <div className="text-left flex flex-col gap-8">
        <p  className="text-tw text-5xl font-extrabold uppercase text-tw-primary border-b-[1px] border-gray-600 pb-8">
          " Creating Web Is an Art "
        </p>
        <p>
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