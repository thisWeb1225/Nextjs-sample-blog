import { useRef, MouseEvent, useEffect, useCallback } from "react";

import { ProjectDataType } from "../../lib/project";

import ProjectItem from "./projectItem";

type ProjectPositionType = {
  src: string,
  x: number,
  y: number
}

const projectsPosition = [
  {
    src: '/images/officialWebsite.png',
    x: 57,
    y: 73,
  },
  {
    src: '/images/IG.png',
    x: 22,
    y: 20,
  },
]

export type ProjectDataAndPositionType = ProjectPositionType & ProjectDataType
/**
 * 
 * src: string,
 * x: number,
 * y: number
 * id: string,
 * title: string,
 * date: string,
 * demoUrl?: string,
 * githubUrl?: string,
 * contentHtml: string,
 * 
 */

const Project = ({allSortedProjectsData}: {
  allSortedProjectsData: ProjectDataType[]
}) => {

  const projectsDataAndPosition = allSortedProjectsData.reduce((total: ProjectDataAndPositionType[], projectData: ProjectDataType, currentIndex: number) => {
    total.push({...projectData, ...projectsPosition[currentIndex]})
    return total;
  }, [] as ProjectDataAndPositionType[])

  const gallery = useRef<HTMLDivElement>(null);
  const galleryInner = useRef<HTMLDivElement>(null);
  const galleryTitle = useRef<HTMLDivElement>(null);

  const hoverEffect = (e: MouseEvent<HTMLDivElement>) => {
    const gallerySize = gallery.current.getBoundingClientRect();
    const raion = 50;
    const calcX = -(e.clientX - gallerySize.left - gallerySize.width / 2) / raion;
    const calcY = -(e.clientY - gallerySize.top - gallerySize.height / 2) / (raion / 2);
    galleryInner.current.style.setProperty('--x', `${-10 + calcX}%`);
    galleryInner.current.style.setProperty('--y', `${-10 + calcY}%`);
    galleryTitle.current.style.setProperty('--x', `${-50 + calcX}%`);
    galleryTitle.current.style.setProperty('--y', `${-50 + calcY}%`);
  }

  const mouseLeave = useCallback(() => {
    galleryInner.current.style.setProperty('--x', `${-10}%`);
    galleryInner.current.style.setProperty('--y', `${-10}%`);
    galleryTitle.current.style.setProperty('--x', `${-50}%`);
    galleryTitle.current.style.setProperty('--y', `${-50}%`);
  }, [galleryInner, galleryTitle])

  useEffect(() => {
    // init position
    mouseLeave();
  }, [mouseLeave])

  return (
    <div className="h-[80vh] relative z-10 overflow-hidden mt-12 border-[1px] border-gray-600 rounded-md mx-4 bg-[rgba(0,0,0,0.3)] group" ref={gallery} onMouseMove={hoverEffect} onMouseLeave={mouseLeave}>
      <h3 className="text-5xl text-tw-primary font-bold absolute top-1/2 left-1/2 translate-x-[var(--x)] translate-y-[var(--y)] ease-linear text-stroke-primary duration-500 group-hover:text-transparent" ref={galleryTitle}>My Projects</h3>
      <div className="h-[120%] w-[120%] translate-x-[var(--x)] translate-y-[var(--y)] duration-300 ease-linear project__gallery" ref={galleryInner} >
        {projectsDataAndPosition.map((project, i) =>
          <ProjectItem
            id={project.id}
            src={project.src}
            date={project.date}
            title={project.title}
            x={project.x}
            y={project.y}
            key={i}
          />)}
      </div>
    </div>
  )
}

export default Project;