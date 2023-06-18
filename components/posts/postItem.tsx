import Link from "next/link";
import { sortedPostsDataType } from "../../lib/posts";
import { useEffect, useRef } from "react";

import styles  from "./../../styles/postItem.module.css";

const PostItem = ({ id, date, title }: sortedPostsDataType) => {
  const post = useRef<HTMLLIElement>(null);

  useEffect(() => {
    post.current.addEventListener('mousemove', (e) => {
      const postRect = post.current.getBoundingClientRect();
      const calX = e.clientX - postRect.left;
      const calY = e.clientY - postRect.top;
      post.current.style.setProperty('--x', `${calX}px`);
      post.current.style.setProperty('--y', `${calY}px`);
    })
  }, [post])
  

  return (
    <li key={id} className={`min-h-[300px] text-center border-[1px] border-gray-600 hover:border-tw-gray duration-500 rounded-md group relative bg-[rgba(0,0,0,0.3)] ${styles.postItem}`} ref={post}>
      <Link href={`/posts/${id}`} className="h-full p-8 flex flex-col gap-4 justify-center relative z-10">
        <h3 className="text-base text-gray-600 duration-500 group-hover:text-tw-white">{title}</h3>
        <p className="text-xs text-tw-gray">{date}</p>
      </Link>
    </li>
  )
}

export default PostItem;

