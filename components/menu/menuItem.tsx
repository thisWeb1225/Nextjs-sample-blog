import { useRef, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { gsap } from "gsap";

import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

type MenuItemProps = {
  name: string,
  path: string,
  gsapDelay: number,
  locale?: string | false,
} 

const MenuItem = ({ name, path, gsapDelay, locale }: MenuItemProps) => {

  const router = useRouter();

  const menuItemParent = useRef(null);
  const menuItemChild = useRef(null);
  useFollowMouseEffect(menuItemParent, menuItemChild);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(menuItemChild.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        delay: gsapDelay,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <li className={`text-center text-xs p-2 md:p-4 ${router.pathname === path ? 'text-tw-secondary' : 'text-tw-white'}`} ref={menuItemParent}>
      <Link href={path} ref={menuItemChild} className="block relative" locale={locale}>{name}</Link>
      {/* {before:absolute before:w-2 before:aspect-square before:left-1/2 before:rounded-full before:-translate-x-1/2 before:bg-tw-white before:opacity-0 before:-bottom-6 before:duration-500 group-hover:before:-bottom-4 group-hover:before:opacity-100} */}
    </li>
  )
}

export default MenuItem