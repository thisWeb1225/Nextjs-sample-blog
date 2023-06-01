import { useRef } from "react";
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

const About = () => {

  const aboutParent = useRef(null);
  const aboutChild1 = useRef(null);
  const aboutChild2 = useRef(null);
  useFollowMouseEffect(aboutParent, aboutChild1, aboutChild2);

  return (
    <div className="mt-32 grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-y-16 md:gap-4 text-center px-2 sm:px-8 md:px-24 lg:px-32">
      <div className="text-left flex flex-col gap-6 px-4">
        <p className="text-tw text-5xl font-extrabold uppercase text-tw-primary">" Creating Web Is an Art "</p>
        <p>
          I use React or Vue with TypeScript to build websites and I love UI design and web's animation design.
          <br />
          I believe that creating webs is an art, so I founded an instagram social media to share tutorials on front-end effects. Within six months, I has been attracted over 2000 followers.
          <br />
          In the future, I want to promote the front-end artistic effects in Taiwan, To make Taiwanese webpages more interesting.
        </p>
      </div>

      <div className="self-end row-[2/2] col-[1/2] md:col-[2/2] w-fit justify-self-center" ref={aboutParent}>
        <div className=" rounded-full p-4 bg-tw-white aspect-square grid place-content-center  relative overflow-hidden after:absolute after:inset-0 after:bg-tw-primary after:translate-y-[100%] hover:after:translate-y-[0%] after:duration-300 after:origin-bottom after:rounded-full group" ref={aboutChild1}>
          <p className="text-base sm:text-2xl z-[1] group-hover:text-tw-dark text-tw-dark" ref={aboutChild2}>About Me</p>
        </div>
      </div>

    </div>
  )
}

export default About;