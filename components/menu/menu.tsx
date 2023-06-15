import { useRef } from "react"

import MenuItem from "./menuItem"

import useFollowMouseEffect from "../../hooks/useFollowMouseEffect"

const menuData = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'posts',
    path: '/posts'
  },
  {
    name: 'project',
    path: '/projects'
  },
]

const Menu = () => {
  const copyContainer = useRef();
  const copy = useRef();

  useFollowMouseEffect(copyContainer, copy)

  return (
    <nav className=" fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 backdrop-blur-md z-50">
      <div ref={copyContainer} className="p-4">
        <p className="text-xs" ref={copy}>&copy; Kun Yang 2023</p>
      </div>
      <ul className="flex">
        {menuData.map((item, i) =>
          <MenuItem name={item.name} path={item.path} key={i}/>
        )}
      </ul>
    </nav>
  )
}

export default Menu;