import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRef } from 'react';
import { MouseEvent, MutableRefObject } from 'react';
import gsap from 'gsap';

import { ProjectTypeWithHtml } from '../../lib/projects';
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

const ProjectItem = ({
  bannerSrc,
  id,
  title,
  titleCh,
  role,
  date,
}: PropType) => {
  const router = useRouter();
  const displayTitle = router.locale === 'en' ? title : titleCh;

  const img = useRef<HTMLImageElement>();

  const showImg = (
    img: MutableRefObject<HTMLImageElement>,
    e: MouseEvent<HTMLDivElement>
  ) => {
    if (!img.current) return;
    const targetRect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - targetRect.left);
    const y = Math.round(e.clientY - targetRect.top);

    // img.current.style.translate = `${x - 120}px ${y - 120}px`;
    gsap.to(img.current, {
      opacity: 1,
      scale: 1,
      x: x - 120,
      y: y - 120,
      duration: 0.6,
    });
  };

  const hiddenImg = (img: MutableRefObject<HTMLImageElement>) => {
    if (!img.current) return;
    gsap.to(img.current, {
      opacity: 0,
      scale: 0,
      duration: 0.8,
    });
  };

  return (
    <Link href={`/projects/${id}`}>
      <div
        className="flex py-10 border-b-[1px] border-tw-gray justify-between items-center relative group"
        onMouseMove={(e) => showImg(img, e)}
        onMouseOut={() => hiddenImg(img)}
      >
        <div
          className="bg-tw-gray w-[240px] p-4 aspect-square grid place-content-center opacity-0 scale-0 absolute top-0 left-0 pointer-events-none z-10"
          ref={img}
        >
          <div className="shadow-tw-shadow pointer-events-none">
            <Image src={bannerSrc} alt={title} width={200} height={200} />
          </div>
        </div>
        <p className="text-tw-primary text-3xl duration-500 group-hover:text-orange-500 pointer-events-none">
          {displayTitle}
        </p>
        <p className="text-tw-gray text-xs text-right pl-2">{role}</p>
      </div>
    </Link>
  );
};

export default ProjectItem;
