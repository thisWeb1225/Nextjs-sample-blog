import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { ProjectTypeWithHtml } from "../../lib/projects";

import ProjectItem from "./projectItem";

import { useTranslation } from "next-i18next";

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
  allSortedProjectsData: ProjectTypeWithHtml[],
}

const ProjectContainer = ({ allSortedProjectsData }: PropType) => {
  
  const { t } = useTranslation('common')

  const project = useRef();
  const projectTitle = useRef();
  const projectContent = useRef();
  const projectItemContainer = useRef();

  useEffect(() => {

    let ctx = gsap.context(() => {

      gsap.timeline({
        scrollTrigger: {
          trigger: project.current,
          start: "top bottom",
          end: "center 60%",
          scrub: 1,
        }
      })
        .from(projectTitle.current, {
          y: 300,
        }, 0)
        .from(projectContent.current, {
          y: 450,
        }, 0.1)
        .from(projectItemContainer.current, {
          y: 600,
        }, 0.2)

    })

    return () => ctx.revert(); // cleanup

  }, []);

  return (
    <div className="tw-spacing mt-36" ref={project}>
      <h3 className="text-4xl text-tw-primary font-bold" ref={projectTitle}>{t('project-heading')}</h3>
      <p className="mt-10 text-tw-white max-w-[80%]" ref={projectContent}>{t('project-content')}</p>
      <div className="mt-10 flex flex-col" ref={projectItemContainer}>
        {allSortedProjectsData.map((project, i) =>
          <ProjectItem
            id={project.id}
            bannerSrc={project.bannerSrc}
            date={project.date}
            title={project.title}
            titleCh={project.titleCh}
            role={project.role}
            key={i}
          />)}
      </div>
    </div>

  )
}

export default ProjectContainer;