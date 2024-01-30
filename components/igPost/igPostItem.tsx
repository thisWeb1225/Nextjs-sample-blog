import Link from "next/link";

import { useRef } from "react";

type IgPostItemType = {
  postLink: string,
  videoPath: string
}

const IgPostItem = ({postLink, videoPath}: IgPostItemType) => {

  const videoRef = useRef<HTMLVideoElement>();

  const playVideo = () => {
    videoRef.current.play();
  }

  const pauseVideo = () => {
    videoRef.current.pause();
  }

  return (
    <Link
      href={postLink}
      target="_blank"
      className="p-6 rounded-lg bg-[rgba(0,0,0,0.3)] flex flex-col items-center group border-gray-900 border-[1px]"
      onMouseEnter={playVideo} onMouseOut={pauseVideo}
    >
      <video src={videoPath} muted loop className="object-cover pointer-events-none" ref={videoRef}></video>
      <div className="text-center text-xs mt-4 py-2 px-4  border-[1px] border-tw-gray duration-500 group-hover:bg-tw-secondary group-hover:border-transparent group-hover:text-tw-dark">Watch Post</div>
    </Link>
  );
}

export default IgPostItem;