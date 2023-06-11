import Image from "next/image"
import Link from "next/link";

import { useEffect, useRef } from "react";

import { ProjectDataAndPositionType } from "./projectContainer";
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

type a = {
  src: string,
  x: number,
  y: number
  id: string,
  title: string,
  date: string,
  demoUrl?: string,
  githubUrl?: string,
  contentHtml: string,
}

type Prop = Omit<ProjectDataAndPositionType, 'contentHtml'>

const ProjectItem = ({src, x, y, id, title, date}: Prop) => {

  const imgBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    imgBox.current.style.setProperty('--x', `${x}%`);
    imgBox.current.style.setProperty('--y', `${y}%`);
  }, [imgBox])

  return (
    <Link href={`/projects/${id}`}>
      <div className="absolute left-[var(--x)] top-[var(--y)] group hover:scale-125 duration-700 project__img" ref={imgBox}>
        <Image
          src={src}
          alt={title}
          width={200}
          height={200}
          className="object-cover shadow-tw-shadow duration-500"
        />
        <div className="flex flex-col items-center mt-2 invisible opacity-0 duration-500 group-hover:visible group-hover:opacity-100">
          <p className="text-[14px] text-tw-gray">
            {date}
          </p>
          <p className="text-tw-primary text-xs">
            {title}
          </p>
        </div>
      </div>
    </Link>

  )
}

export default ProjectItem