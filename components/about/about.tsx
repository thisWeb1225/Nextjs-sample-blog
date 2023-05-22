import { useRef } from "react";
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

  // about.current.style.transform = 'translateX(var(--x)) translateY(var(--y))'

  // const hoverEffect = (e: MouseEvent<HTMLDivElement>) => {
  //   const aboutContainerSize = aboutContainer.current.getBoundingClientRect();
  //   const x = e.clientX - aboutContainerSize.left - aboutContainerSize.width / 2;
  //   const y = e.clientY - aboutContainerSize.top - aboutContainerSize.height / 2;
  //   about.current.style.setProperty('--x', `${x / 2}px`)
  //   about.current.style.setProperty('--y', `${y / 2}px`)
  // }

  // const mouseleave = () => {
  //   about.current.style.setProperty('--x', `${0}px`)
  //   about.current.style.setProperty('--y', `${0}px`)
  // }

const About = () => {
  
  const aboutContainer = useRef(null)
  const about = useRef(null);
  useFollowMouseEffect(aboutContainer, about, true)


  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-4 text-center px-2 sm:px-8 md:px-24 lg:px-32">
      <div className="text-left flex flex-col gap-6">
        <p className="text-tw-primary italic text-4xl font-extrabold">" Creating Web Is an Art "</p>
        <p>
          I use react or Vue with TypeScript to develop websites and excel in UI/UX design and web animation production.
          <br />
          I started learning front-end around 2022. I believe that creating webs is an art, so I founded an Instagram social media to share tutorials on front-end effects. Within six months, it attracted over 2000 followers.
          <br />
          In the future, I want to promote the front-end artistic effects in Taiwan, To make Taiwanese webpages more interesting.
        </p>
      </div>

      <div className="self-end rounded-full p-4 bg-tw-white row-[2/2] col-[2/2] w-fit aspect-square grid place-content-center justify-self-center relative overflow-hidden after:absolute after:inset-0 after:bg-tw-primary after:translate-y-[100%] hover:after:translate-y-[0%] after:duration-300 after:origin-bottom after:rounded-full group" ref={aboutContainer}>
        <p className="text-2xl z-[1] group-hover:text-tw-dark text-tw-dark" ref={about}>About Me</p>
      </div>

    </div>
  )
}

export default About;