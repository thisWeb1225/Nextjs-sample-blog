
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
    name: 'footer',
    path: '/'
  },
]

const Menu = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:right-auto md:top-0   bg-tw-dark">
        <ul className="h-full flex md:flex-col justify-between py-2 md:py-16 px-4">
          {menuData.map((item) => {
            return (
              <li className="text-center">{item.name}</li>
            )
          })}
        </ul>
    </nav>
  )
}

export default Menu;