import { useRef, useEffect } from "react"
import Link from "next/link"

import { gsap } from "gsap";

import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

type menuItemProps = {
  name: string,
  path: string,
  gsapDelay: number
}

const MenuItem = ({ name, path, gsapDelay }: menuItemProps) => {

  const menuItemParent = useRef(null);
  const menuItemChild = useRef(null);
  useFollowMouseEffect(menuItemParent, menuItemChild);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(menuItemChild.current, {
        x: -100,
        opacity: 0,
        duration: 1.4,
        delay: gsapDelay,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <li className="text-center uppercase text-xs p-4 group" ref={menuItemParent}>
      <Link href={path} ref={menuItemChild} className="block relative before:absolute before:w-2 before:aspect-square before:left-1/2 before:rounded-full before:-translate-x-1/2 before:bg-tw-white before:opacity-0 before:-bottom-6 before:duration-500 group-hover:before:-bottom-4 group-hover:before:opacity-100">{name}</Link>
    </li>
  )
}

export default MenuItem