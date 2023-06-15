import Image from "next/image"
import Link from "next/link";

import { useEffect, useRef } from "react";
import { MouseEvent } from "react";

import { ProjectTypeWithHtml } from "../../lib/projects";
/**
 * 
 * src: string,
 * id: string,
 * title: string,
 * date: string,
 * role: string,
 * demoUrl?: string,
 * githubUrl?: string,
 * contentHtml: string,
 * 
 */

type PropType = Omit<ProjectTypeWithHtml, 'contentHtml'>;

const ProjectItem = ({bannerSrc, id, title, role, date}: PropType) => {
  const img = useRef<HTMLImageElement>();

  const showImg = (e:MouseEvent<HTMLDivElement>) => {
    if (!img.current) return;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - targetRect.left;
    const y = e.clientY - targetRect.top;

    img.current.style.translate = `${x - 120}px ${y - 120}px`
  }

  return (
    <Link href={`/projects/${id}`} >
      <div className="flex py-12 border-b-[1px] border-tw-gray justify-between items-center relative group" onMouseMove={showImg}>
        <div className="bg-tw-gray w-[240px] aspect-square grid place-content-center opacity-0 scale-0 absolute top-0 left-0 duration-500 ease-linear group-hover:opacity-100 group-hover:scale-100 pointer-events-none" ref={img}>
          <Image
            src={bannerSrc}
            alt={title}
            width={200}
            height={200}
            className="object-cover shadow-tw-shadow"
          />
        </div>
          <p className="text-tw-primary text-4xl uppercase duration-500 group-hover:saturate-[0.2]">
            {title}
          </p>
          <p className="text-tw-gray text-xs">{role}</p>
      </div>
    </Link>

  )
}

export default ProjectItem