import Link from "next/link";
import { sortedPostsDataType } from "../../lib/posts";

const PostItem = ({ id, date, title }: sortedPostsDataType) => {

  return (
    <li key={id} className="min-h-[360px] text-center border-2 rounded-md border-tw-gray">
      <Link href={`/posts/${id}`} className="h-full p-8 flex flex-col justify-center">
        <h3 className="text-base">{title}</h3>
        <p className="text-xs text-tw-gray">{date}</p>
      </Link>
    </li>
  )
}

export default PostItem;

