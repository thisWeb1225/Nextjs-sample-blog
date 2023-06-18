import Image from "next/image";

const Footer = () => {
  return (
    <div className="tw-spacing mt-36 pb-40 grid gap-8 ">
      <div className="">
        <div className="flex items-center gap-8">        
          <Image
          priority
          src="/images/avatar.jpg"
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full flex-grow-0"
          /> 
          <p className="text-4xl">Let’s work together</p>
        </div>
      </div>
      <div className="tw-line"></div>
      <div className="grid gap-4 justify-start whitespace-break-spaces text-base">
        <a href="https://www.instagram.com/this.web/" target="_blank" className="tw-link">Instagram : this.web</a>
        <a href="mailto:kun881225@gmail.com" target="_blank" className="tw-link">Gmail : kun881225@gmail.com</a>
      </div>
    </div>
  )
}

export default Footer;