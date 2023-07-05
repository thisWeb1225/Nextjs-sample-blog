import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";

import { useRef } from "react";
import { MouseEvent, MutableRefObject } from "react";

import { ProjectTypeWithHtml } from "../../lib/projects";
/**
 * 
 * src: string,
 * id: string,
 * title: string,
 * titleCh: string,
 * date: string,
 * role: string,
 * demoUrl?: string,
 * githubUrl?: string,
 * contentHtml: string,
 * 
 */

type PropType = Omit<ProjectTypeWithHtml, 'contentHtml'>;

const ProjectItem = ({bannerSrc, id, title, titleCh, role, date}: PropType) => {

  const router = useRouter();
  const displayTitle = router.locale === 'en' ? title : titleCh

  const img = useRef<HTMLImageElement>();

  const showImg = (img:MutableRefObject<HTMLImageElement>, e:MouseEvent<HTMLDivElement> ) => {
    if (!img.current) return;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - targetRect.left);
    const y = Math.round(e.clientY - targetRect.top);

    img.current.style.translate = `${x - 120}px ${y - 120}px`
  }

  return (
    <Link href={`/projects/${id}`} >
      <div className="flex py-12 border-b-[1px] border-tw-gray justify-between items-center relative group" onMouseMove={(e) => showImg(img, e)}>
        <div className="bg-tw-gray w-[240px] p-4 aspect-square grid place-content-center opacity-0 scale-0 absolute top-0 left-0 duration-300 ease-linear group-hover:opacity-100 group-hover:scale-100 pointer-events-none z-10" ref={img}>
          <Image
            src={bannerSrc}
            alt={title}
            width={200}
            height={200}
            className="object-cover shadow-tw-shadow pointer-events-none w-auto h-auto"
          />
        </div>
          <p className="text-tw-primary text-4xl uppercase duration-500 group-hover:text-orange-500 pointer-events-none">
            {displayTitle}
          </p>
          <p className="text-tw-gray text-xs text-right pl-2">{role}</p>
      </div>
    </Link>

  )
}

export default ProjectItem