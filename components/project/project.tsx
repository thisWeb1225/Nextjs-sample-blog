import { use, useRef, MouseEvent, useEffect, useCallback } from "react";
import ProjectItem from "./projectItem";

const projectData = [
  {
    src: '/images/IG.png',
    date: '2022.9 ~ now',
    title: 'IG social media',
    x: 22,
    y: 27,
  },
  {
    src: '/images/officialWebsite.png',
    date: '2023.3 ~ now',
    title: 'Official Website',
    x: 57,
    y: 73,
  }
]

export type projectDataType = typeof projectData[0];

const Project = () => {

  const gallery = useRef<HTMLDivElement>(null);
  const galleryInner = useRef<HTMLDivElement>(null);

  const hoverEffect = (e: MouseEvent<HTMLDivElement>) => {
    const gallerySize = gallery.current.getBoundingClientRect();
    const raion = 100;
    const calcX = -(e.clientX - gallerySize.left - gallerySize.width / 2) / raion;
    const calcY = -(e.clientY - gallerySize.top - gallerySize.height / 2) / raion;
    console.log(calcX)
    galleryInner.current.style.setProperty('--x', `${-10 + calcX}%`);
    galleryInner.current.style.setProperty('--y', `${-10 + calcY}%`);
  }

  const mouseLeave = useCallback(() => {
    galleryInner.current.style.setProperty('--x', `${-10}%`);
    galleryInner.current.style.setProperty('--y', `${-10}%`);
  }, [galleryInner])

  useEffect(() => {
    // init position
    mouseLeave();
  }, [mouseLeave])

  return (
    <div className="h-screen relative mt-36 z-10 overflow-hidden" ref={gallery} onMouseMove={hoverEffect} onMouseLeave={mouseLeave}>
      <div className="h-[120%] w-[120%] translate-x-[var(--x)] translate-y-[var(--y)] duration-300 ease-linear project__gallery" ref={galleryInner} >
          {projectData.map((project, i) =>
            <ProjectItem
              src={project.src}
              date={project.date}
              title={project.title}
              x={project.x}
              y={project.y}
              />)}
      </div>
              <h3 className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">My Projects</h3>

    </div>
  )
}

export default Project;