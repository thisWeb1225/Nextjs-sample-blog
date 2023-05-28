import Image from "next/image";

const Footer = () => {
  return (
    <div className="px-2 sm:px-8 md:px-24 lg:px-32 mt-36 pb-40 flex justify-between items-center gap-24 flex-wrap">
      <div className="flex-grow-0">
        <div className="flex items-center gap-8">        
          <Image
          priority
          src="/images/avatar.jpg"
          alt="avatar"
          width={300}
          height={300}
          className="w-20 max-h-20 rounded-full flex-grow-0"
          /> 
          <p className="text-6xl">Let’s work together</p>
        </div>
      </div>

      <div className="flex-1 grid gap-4 whitespace-break-spaces">
        <p>Gmail: kun881225@gmail.com</p>
        <p>Instagram: this.web</p>
      </div>

      <div className="flex-grow-0 -rotate-45 origin-top-left self-end">
        <div className="w-1 h-5 bg-tw-white absolute -rotate-45 origin-top-left"></div>
        <div className="w-1 h-10 bg-tw-white absolute"></div>
        <div className="w-1 h-5 bg-tw-white absolute rotate-45 origin-top-left"></div>
      </div>
      
    </div>
  )
}

export default Footer;