import Image from "next/image"
import { useEffect, useRef } from "react";
import { projectDataType } from "./project";


const ProjectItem = ({src, date, title, x, y}: projectDataType) => {

  const imgBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    imgBox.current.style.setProperty('--x', `${x}%`);
    imgBox.current.style.setProperty('--y', `${y}%`);
  }, [imgBox])

  return (
    <div className="absolute left-[var(--x)] top-[var(--y)] group project__img" ref={imgBox}>
      <Image
        src={src}
        alt={title}
        width={250}
        height={250}
        className="object-cover shadow-tw-shadow"
      />
      <div className="flex flex-col items-center mt-2 invisible opacity-0 duration-500 group-hover:visible group-hover:opacity-100">
        <p className="text-xs text-tw-gray">
          {date}
        </p>
        <p className="text-tw-primary text-base">
          {title}
        </p>
      </div>
    </div>
  )
}

export default ProjectItem