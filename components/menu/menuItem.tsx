import { MouseEvent, useRef } from "react"
import useFollowMouseEffect from "../../hooks/useFollowMouseEffect";

const MenuItem = ({ name, path }: {
  name: string,
  path: string,
}) => {

  const menuItemLink = useRef(null);
  const menuItem = useRef(null);
  useFollowMouseEffect(menuItem, menuItemLink)


  return (
    <li className="text-center uppercase text-xs p-4 group" ref={menuItem}>
      <a href={path} ref={menuItemLink} className="block relative before:absolute before:w-2 before:aspect-square before:left-1/2 before:rounded-full before:-translate-x-1/2 before:bg-tw-white before:opacity-0 before:-bottom-6 before:duration-500 group-hover:before:-bottom-4 group-hover:before:opacity-100">{name}</a>
    </li>
  )
}

export default MenuItem