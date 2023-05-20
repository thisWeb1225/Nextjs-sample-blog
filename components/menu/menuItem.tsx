import { MouseEvent, useRef } from "react"

const MenuItem = ({ name, path }: {
  name: string,
  path: string,
}) => {

  const menuItemLink = useRef<HTMLAnchorElement>(null);
  const menuItem = useRef<HTMLLIElement>(null);

  const hoverEffect = (e: MouseEvent<HTMLLIElement>) => {
    const menuItemSize = menuItem.current.getBoundingClientRect();
    const x = e.clientX - menuItemSize.left - menuItemSize.width / 2;
    const y = e.clientY - menuItemSize.top - menuItemSize.height / 2;
    menuItemLink.current.style.setProperty('--x', `${x / 2}px`)
    menuItemLink.current.style.setProperty('--y', `${y / 2}px`)
  }

  const mouseleave = () => {
    menuItemLink.current.style.setProperty('--x', `${0}px`)
    menuItemLink.current.style.setProperty('--y', `${0}px`)
  }


  return (
    <li className="text-center uppercase text-xs p-4" onMouseMove={hoverEffect} onMouseLeave={mouseleave} ref={menuItem}>
      <a href={path} ref={menuItemLink} className="block translate-x-[var(--x)] translate-y-[var(--y)] transition-transform duration-100 ease-linear">{name}</a>
    </li>
  )
}

export default MenuItem