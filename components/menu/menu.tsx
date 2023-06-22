import { useRef, useEffect } from "react"

import MenuItem from "./menuItem"

import useFollowMouseEffect from "../../hooks/useFollowMouseEffect"

import { gsap } from "gsap"

const menuData = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Posts',
    path: '/posts'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
]

const Menu = () => {
  const copyContainer = useRef();
  const copy = useRef();

  useFollowMouseEffect(copyContainer, copy);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(copyContainer.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 backdrop-blur-md z-50">
      <div ref={copyContainer} className="p-4 overflow-x-hidden">
        <p className="text-xs whitespace-nowrap" ref={copy}>&copy; Kun Yang 2023</p>
      </div>
      <ul className="flex">
        {menuData.map((item, i) =>
          <MenuItem 
            name={item.name} 
            path={item.path} 
            key={i}
            gsapDelay={(i + 1) * 0.2}  
          />
        )}
      </ul>
    </nav>
  )
}

export default Menu;