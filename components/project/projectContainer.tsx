import { useRef, MouseEvent, useEffect, useCallback } from "react";

import { ProjectTypeWithHtml } from "../../lib/projects";

import ProjectItem from "./projectItem";

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

  return (
    <div className="px-2 sm:px-8 md:px-24 lg:px-32 mt-36">
      <h3 className="text-xl text-tw-gray font-bold" >My Projects</h3>
      <div className="mt-16 flex flex-col">
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