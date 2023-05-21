import Image from "next/image";

const Project = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center mt-48">
      <h3 className="text-4xl">My Projects</h3>
      <div>
        <div>
            <Image 
              src="/images/IG.png"
              alt="IG"
              width={300}
              height={300}
            />
            <div></div>
            <div>
              <h4>IG social media</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Project;