import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { ProjectTypeWithHtml } from "../../lib/projects";

import ProjectItem from "./projectItem";

gsap.registerPlugin(ScrollTrigger);

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

type PropType = {
  allSortedProjectsData: ProjectTypeWithHtml[]
}

const ProjectContainer = ({allSortedProjectsData}: PropType) => {

  const project = useRef()
  const projectTitle = useRef();
  const projectItemContainer = useRef();

  useEffect(() => {

    let ctx = gsap.context(() => {
      
      gsap.timeline({scrollTrigger:{
        trigger: project.current,
        start:  "top bottom",  
        end:  "center center",
        scrub: 1,
      }})
      .from(projectTitle.current, {
        y: 300,
      }, 0)
      .from(projectItemContainer.current, {
        y: 300,
      }, 0.2)

    })
      
    return () => ctx.revert(); // cleanup
    
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="tw-spacing mt-24" ref={project}>
      <h3 className="text-xl text-tw-gray font-bold" ref={projectTitle}>My Projects</h3>
      <div className="mt-10 flex flex-col" ref={projectItemContainer}>
        {allSortedProjectsData.map((project, i) =>
          <ProjectItem
            id={project.id}
            bannerSrc={project.bannerSrc}
            date={project.date}
            title={project.title}
            role={project.role}
            key={i}
          />)}
      </div>
    </div>
  )
}

export default ProjectContainer;