import Link from "next/link";

type IgPostItemType = {
  postLink: string,
  videoPath: string
}

const IgPostItem = ({postLink, videoPath}: IgPostItemType) => {
  return (
    <Link
      href={postLink}
      target="_blank"
      className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] flex flex-col items-center group"
    >
      <video src={videoPath} muted autoPlay loop className="object-cover"></video>
      <div className="text-center text-xs mt-8 py-2 px-4  border-[1px] border-tw-gray duration-500 group-hover:bg-tw-secondary group-hover:border-transparent group-hover:text-tw-dark">Watch Post</div>
    </Link>
  );
}

export default IgPostItem;