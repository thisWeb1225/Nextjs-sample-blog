import Image from "next/image"
import MenuItem from "./menuItem"

const menuData = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'about',
    path: '/'
  },
  {
    name: 'project',
    path: '/'
  },
  {
    name: 'posts',
    path: '/'
  },
  {
    name: 'contact',
    path: '/'
  },
]

const Menu = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between p items-center px-4 py-2 backdrop-blur-md">
      <Image
        priority
        src="/images/avatar.jpg"
        alt="avatar"
        width={300}
        height={300}
        className="w-12 max-h-12 rounded-full"
      />
      <ul className="flex">
        {menuData.map((item, i) =>
          <MenuItem name={item.name} path={item.path} key={i}/>
        )}
      </ul>
    </nav>
  )
}

export default Menu;