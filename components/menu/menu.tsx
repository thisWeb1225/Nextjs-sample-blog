import { useRef, useEffect } from "react"

import MenuItem from "./menuItem"

import useFollowMouseEffect from "../../hooks/useFollowMouseEffect"

import { gsap } from "gsap"

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

// useEffect(() => {

//   let ctx = gsap.context(() => {
    
//     gsap.timeline({scrollTrigger:{
//       trigger: project.current,
//       start:  "top bottom",  
//       end:  "center center",
//       scrub: 1,
//     }})
//     .from(projectTitle.current, {
//       y: 300,
//     }, 0)
//     .from(projectItemContainer.current, {
//       y: 300,
//     }, 0.1)

//   })
    
//   return () => ctx.revert(); // cleanup
  
// }, []); // <- empty dependency Array so it doesn't re-run on every render

const Menu = () => {
  const copyContainer = useRef();
  const copy = useRef();

  useFollowMouseEffect(copyContainer, copy);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(copyContainer.current, {
        x: -100,
        opacity: 0,
        duration: 1.4,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav className=" fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 backdrop-blur-md z-50">
      <div ref={copyContainer} className="p-4">
        <p className="text-xs" ref={copy}>&copy; Kun Yang 2023</p>
      </div>
      <ul className="flex">
        {menuData.map((item, i) =>
          <MenuItem 
            name={item.name} 
            path={item.path} 
            key={i}
            gsapDelay={(i + 1) * 0.4}  
          />
        )}
      </ul>
    </nav>
  )
}

export default Menu;